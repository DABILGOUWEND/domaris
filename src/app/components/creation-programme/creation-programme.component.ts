import { Component, computed, effect, forwardRef, inject, input, linkedSignal, output, signal, ViewChild } from '@angular/core';
import { ProgrammeStore } from '../../stores/appstore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { countries } from "../../modeles/pays"
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';

import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { child } from '@angular/fire/database';
import { phases } from '../../modeles/models';
import { StorageService } from '../../services/storage.service';
import { MatStepper } from '@angular/material/stepper';
import { UtilitairesService } from '../../services/utilitaires.service';
// Assuming you have a file with country data
const my_countries = countries; // Extracting country names
@Component({
  selector: 'app-creation-programme',
  imports: [ImportedModule],
  templateUrl: './creation-programme.component.html',
  styleUrl: './creation-programme.component.scss'
})
export class CreationProgrammeComponent {
  // injections
  _programme_store = inject(ProgrammeStore);
  _utilitaires = inject(UtilitairesService)
  @ViewChild('stepper') stepper!: MatStepper;
  // signals inputs
  isUpdated = input.required<boolean>();
  donneesProgramme = input<any>();
  is_opened = input<boolean>();
  programmeForm = input.required<FormGroup>();
  phasesFormGroup = input.required<FormGroup>();
  users = input.required<any[]>();
  //  outputs
  save_event = output<any>();


  // output
  close_event = output();

  // computed signals
  Phases = computed(() => {
    return this.donneesProgramme() != undefined ? this.donneesProgramme()?.phases.map(
      (phase: phases) => {
        let documents = phase.documents;
        let modif_doc = documents.map((doc: any) => {
          return {
            ...doc,
            createdAt: doc.createdAt.toDate(),
            updatedAt: doc.updatedAt.toDate()
          }
        })
        return {
          ...phase,
          documents: modif_doc
        }

      }
    ) : [];
  });

  // others data
  types = ['Résidentiel', 'Commercial', 'Mixte'];
  statuts = ['Planifié', 'En cours', 'Terminé', 'Suspendu'];
  pays = my_countries;
  phasesForm: FormGroup;
  phaseForm: FormGroup;
  budgetsForm: FormGroup;
  depensesForm: FormGroup;
  noeud_racine: FormGroup;
  isLoading = false;
  errorMessage = 'Veuillez remplir tous les champs obligatoires';
  successMessage = '';
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  editNode: any = null;
  editMode: 'add' | 'edit' | 'addR' | null = null;
  fileUrl: string | null = null;
  lastFilePath: string | null = null;
  responsables = computed(() => {
    return this.users().map(user => {
      return {
        id: user.id,
        name: `${user.prenom} ${user.nom}`
      };
    });

  })
  constructor(
    private storageService: StorageService,
    private fb: FormBuilder
  ) {
    this.phaseForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      statut: ['', Validators.required],
      responsableId: ['', Validators.required],
    });
    this.phasesForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      dateDebut: [new Date(), Validators.required],
      dateFin: [new Date(), Validators.required],
      statut: ['', Validators.required],
      responsableId: ['', Validators.required],
    });
    this.budgetsForm = this.fb.group({
      intitule: ['', Validators.required],
      montant_htva: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      url_document: ['', Validators.required],
    });
    this.noeud_racine = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      statut: ['', Validators.required],
      responsableId: ['', Validators.required],
    })

    effect(() => {
      const phases = this.Phases() || [];
      this.dataSource.data = phases;
      this.treeControl.dataNodes = phases;
    });
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  // Ajout d'une sous-phase
  addChild(node: any) {
    this.editNode = node;
    this.editMode = 'add';
    this.phaseForm.reset();
  }
  addChildR() {
    this.editNode = null;
    this.editMode = 'addR';
    this.noeud_racine.reset();
  }
  startEdit(node: any) {
    this.editNode = node;
    this.editMode = 'edit';
    this.phaseForm.patchValue({
      nom: node.nom,
      description: node.description,
      dateDebut: this._utilitaires.convertDate(node.dateDebut),
      dateFin: this._utilitaires.convertDate(node.dateFin),
      statut: node.statut,
      responsableId: node.responsableId
    }
    );
  }
  cancelEdit() {
    this.editNode = null;
    this.editMode = null;
  }

  confirmEdit(
    node: any,
    nom: string,
    description: string,
    dateDebut: string,
    dateFin: string,
    statut: string,
    responsableId: string
  ) {
    node.nom = nom;
    node.description = description;
    node.dateDebut = dateDebut;
    node.dateFin = dateFin;
    node.statut = statut;
    node.responsableId = responsableId;
    this.dataSource.data = [...this.dataSource.data];
    this.editNode = null;
    this.editMode = null;
  }
  confirmAddChild() {
    if (this.noeud_racine.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    let values = this.noeud_racine.value;
    const newPhase = {
      nom: values.nom,
      description: values.description,
      dateDebut: values.dateDebut.toLocaleDateString(),
      dateFin: values.dateFin.toLocaleDateString(),
      statut: values.statut,
      responsableId: values.responsableId,
      children: [],
      documents: []
    };

    this.dataSource.data = [...this.dataSource.data, newPhase];

    this.editNode = null;
    this.editMode = null;
    this.save_event.emit([...this.dataSource.data]);
  }
  ngOnInit() {
    this._programme_store.loadAllData();
  }
  onSubmit() {
    if (this.programmeForm().invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    let phases = this.dataSource.data;
    const formData = this.programmeForm().value;
    if (this.isUpdated()) {
      let date = new Date();
      this._programme_store.updateProgramme({
        ...formData,
        id: this.donneesProgramme()?.id,
        dateDebut: formData.dateDebut.toLocaleDateString(),
        dateFin: formData.dateFin.toLocaleDateString(),
        createdAt: this.donneesProgramme()?.createdAt,
        updatedAt: date,
        phases: phases || [],
      });
    } else {
      let date = new Date();
      this._programme_store.addProgramme({
        ...formData,
        dateDebut: formData.dateDebut.toLocaleDateString(),
        dateFin: formData.dateFin.toLocaleDateString(),
        createdAt: date,
        updatedAt: date,
        phases: phases || []
      });
    }
    this.close_event.emit();
  }
  add_sous_node(parentNode: any, mode: 'add' | 'edit') {
    if (this.phaseForm.valid) {
      const values = this.phaseForm.value;
      let date_debut = values.dateDebut.toLocaleDateString();
      let date_fin = values.dateFin.toLocaleDateString();
      if (mode === 'edit') {
        Object.assign(this.editNode, {
          ...values,
          dateDebut: date_debut,
          dateFin: date_fin
        });
      } else {
        const newPhase = {
          nom: values.nom,
          description: values.description,
          responsableId: values.responsableId,
          statut: values.statut,
          // Convert dates to string format
          dateDebut: date_debut,
          dateFin: date_fin,
          documents: [], children: []
        };

        if (parentNode) {
          if (!parentNode.children) parentNode.children = [];
          parentNode.children.push(newPhase);
          ;
        } else {
          this.dataSource.data = [...this.dataSource.data, newPhase];
        }
      }
      this.dataSource.data = [...this.dataSource.data];
      this.editNode = null;
      this.editMode = null;
      this.save_event.emit([...this.dataSource.data]);
      this.treeControl.expandAll();
    }
  }
  removeNode(node: any) {
    if (confirm("Voulez-vous vraiment supprimer ce noeud ?")) {
      const remove = (nodes: any[]): boolean => {
        const idx = nodes.indexOf(node);
        if (idx > -1) {
          nodes.splice(idx, 1);
          return true;
        }
        for (const n of nodes) {
          if (n.children && remove(n.children)) return true;
        }
        return false;
      };
      remove(this.dataSource.data);
      this.dataSource.data = [...this.dataSource.data]; // Pour déclencher le rafraîchissement de l'arbre
      this.save_event.emit([...this.dataSource.data]);
      this.treeControl.expandAll(); // Optionnel : pour développer tous les noeuds après suppression

    }

  }
  close() {
    this.close_event.emit();
  }

  async onUpload(event: any, node: any) {
    const file: File = event.target.files[0];
    if (file && node) {
      const url = await this.storageService.uploadFile('uploads/' + file.name, file);
      const now = new Date();
      const document = {
        titre: file.name,
        url: url,
        type: file.type,
        createdAt: now,
        updatedAt: now
      };
      if (!node.documents) node.documents = [];
      node.documents.push(document);
      this.dataSource.data = [...this.dataSource.data]; // Rafraîchir la vue
    }
  }

  async onGetUrl() {
    const url = await this.storageService.getFileUrl('uploads/nom-du-fichier');
    console.log('URL du fichier:', url);
  }

  async onDelete() {
    await this.storageService.deleteFile('uploads/nom-du-fichier');
    console.log('Fichier supprimé');
  }
  isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper.steps.length - 1;
  }
  getLevel(node: any, nodes: any[] = this.dataSource.data, level: number = 0): number {
    for (const n of nodes) {
      if (n === node) return level;
      if (n.children && n.children.length > 0) {
        const childLevel = this.getLevel(node, n.children, level + 1);
        if (childLevel !== -1) return childLevel;
      }
    }
    return -1;
  }

}

