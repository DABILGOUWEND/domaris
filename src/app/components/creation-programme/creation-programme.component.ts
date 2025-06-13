import { Component, computed, effect, forwardRef, inject, input, linkedSignal, output, signal, ViewChild } from '@angular/core';
import { ProgrammeStore } from '../../stores/appstore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { countries } from "../../modeles/pays"
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { NestedTreeControl } from '@angular/cdk/tree';
import { intial_phases, phases } from '../../modeles/models';
import { StorageService } from '../../services/storage.service';
import { MatStepper } from '@angular/material/stepper';
import { UtilitairesService } from '../../services/utilitaires.service';
import { ProgrammesService } from '../../services/programmes.service';
import { MatTableDataSource } from '@angular/material/table';
// Assuming you have a file with country data
const my_countries = countries; // Extracting country names
const initial_phases = intial_phases;
@Component({
  selector: 'app-creation-programme',
  imports: [ImportedModule],
  templateUrl: './creation-programme.component.html',
  styleUrl: './creation-programme.component.scss'
})
export class CreationProgrammeComponent {
  // injections
  _programme_store = inject(ProgrammeStore);
  _utilitaires = inject(UtilitairesService);
  _programme_service = inject(ProgrammesService);
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('fileInput') fileInput: any;

  //signals
  editNode = signal<any>(null);
  current_tab = signal<any>(null);
  editMode = signal<'add' | 'edit' | 'addR' | null>(null);
  fileUrl = signal<string | null>(null);
  lastFilePath = signal<string | null>(null);
  open_doc = signal<boolean>(false);
  doc = signal<any>({
    titre: '',
    file: null,
  });

  // signals inputs
  isUpdated = input.required<boolean>();
  donneesProgramme = input<any>();
  is_opened = input<boolean>();
  programmeForm = input.required<FormGroup>();
  phasesFormGroup = input.required<FormGroup>();
  users = input.required<any[]>();
  //signals outputs
  save_event = output<any>();
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
    ) : initial_phases;
  });

  // others data
  types = ['Résidentiel', 'Commercial', 'Mixte'];
  statuts = ['En attente', 'En cours', 'Terminé', 'Suspendu'];
  document_displayedColumns = [
    'titre',
    'type',
    'download',
    'createdAt',
    'updatedAt',
    'actions'
  ];

  responsables = computed(() => {
    return this.users().map(user => {
      return {
        id: user.id,
        name: `${user.prenom} ${user.nom}`
      };
    });
  })
  document_dataSource = computed(() => {
    if (this.editNode()) {
      return new MatTableDataSource<any>(this.current_tab().documents.map((doc: any) => {
        let date1 = new Date(doc.createdAt);
        let date2 = new Date(doc.updatedAt);
        return {
          ...doc,
          createdAt: date1,
          updatedAt: date2
        }
      }));
    }
    return new MatTableDataSource<any>()
  }
  );
  pays = my_countries;
  phasesForm: FormGroup;
  phaseForm: FormGroup;
  budgetsForm: FormGroup;
  depensesForm: FormGroup;
  noeud_racine: FormGroup;
  creation_docForm: FormGroup;
  isLoading = false;
  errorMessage = 'Veuillez remplir tous les champs obligatoires';
  successMessage = '';
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();



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
    });
    this.creation_docForm = this.fb.group({
      titre: ['', Validators.required],
      file_name: ['', Validators.required],
    });

    effect(() => {
      const phases = this.Phases() || [];
      this.dataSource.data = phases;
      this.treeControl.dataNodes = phases;
    });
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  // Ajout d'une sous-phase
  addChild(node: any) {
    this.editNode.set(node);
    this.editMode.set('add');
    this.phaseForm.reset();
  }
  addChildR() {
    this.editNode.set(null);
    this.editMode.set('addR');
    this.noeud_racine.reset();
  }
  startEdit(node: any) {
    this.current_tab.set(node);
    this.editNode.set(node);
    this.editMode.set('edit');
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
    this.editNode.set(null);
    this.editMode.set(null);
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
    this.editNode.set(null);
    this.editMode.set(null);
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
    this.editNode.set(null);
    this.editMode.set(null);
    if (this.isUpdated()) {
      this._programme_service.add_sousCollection(
        this.donneesProgramme()?.id, 'phases', newPhase
      ).subscribe();
    }
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
    let phases = [...this.dataSource.data];
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

      });
    } else {
      let date = new Date();
      this._programme_store.addProgramme({
        programme: {
          ...formData,
          dateDebut: formData.dateDebut.toLocaleDateString(),
          dateFin: formData.dateFin.toLocaleDateString(),
          createdAt: date,
          updatedAt: date
        }, phases: phases, budgets: []
      });
    }


    this.close_event.emit();
  }
  add_sous_node(parentNode: any, mode: 'add' | 'edit') {
    if (this.phaseForm.valid) {
      const values = this.phaseForm.value;
      let date_debut = values.dateDebut;
      let date_fin = values.dateFin;
      let newPhase = {
        ...values,
        dateDebut: (new Date(date_debut)).toLocaleDateString(),
        dateFin: (new Date(date_fin)).toLocaleDateString(),
      }
      if (mode === 'edit') {
        Object.assign(this.editNode(), newPhase);
      } else {
        newPhase = {
          ...values,
          dateDebut: (new Date(date_debut)).toLocaleDateString(),
          dateFin: (new Date(date_fin)).toLocaleDateString(),
          documents: [],
          children: []
        };

        if (parentNode) {
          if (!parentNode.children) parentNode.children = [];
          parentNode.children.push(newPhase);
          ;
        } else {
          this.dataSource.data = [...this.dataSource.data, newPhase];
        }

      }
      let node = this.getParent(this.editNode());
      let parent = node != null ? node : this.editNode();
      console.log(parent)
      this.dataSource.data = [...this.dataSource.data];
      if (this.isUpdated()) {
        let node = this.getParent(this.editNode());
        let parent = node != null ? node : this.editNode();
        console.log(parent)
        this._programme_service.update_sousCollection(
          this.donneesProgramme()?.id, 'phases', parent
        ).subscribe();
      }
      this.editNode.set(null);
      this.editMode.set(null);

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

      if (this.isUpdated()) {
        let nodep = this.getParent(node);
        let parent = nodep != null ? nodep : node;
        this._programme_service.remove_sousCollection(
          this.donneesProgramme()?.id, 'phases', parent.id
        ).subscribe();
      }
      remove(this.dataSource.data);
      this.dataSource.data = [...this.dataSource.data]; // Pour déclencher le rafraîchissement de l'arbre
      this.treeControl.expandAll(); // Optionnel : pour développer tous les noeuds après suppression

    }

  }
  close() {
    this.close_event.emit();
  }

  get_file(event: any) {
    const file: File = event.target.files[0];
    this.doc.update(doc => ({
      ...doc,
      file: file
    }
    ))
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

  getParent(targetNode: any, nodes: any[] = this.dataSource.data, parent: any = null): any {
    for (const node of nodes) {
      if (node === targetNode) {
        return parent;
      }
      if (node.children && node.children.length > 0) {
        const found = this.getParent(targetNode, node.children, node);
        if (found) return found;
      }
    }
    return null;
  }
  addDocument(node: any) {
  }
  async onSubmitDoc() {
    let file = this.doc().file;
    let file_name = file.name;
    let type = file_name.split('.').pop();
    let url = await this.storageService.uploadFile('uploads/' + file_name, file);
    const newDocument = {
      titre: this.doc().titre,
      url: url,
      type: type,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 1. Ajoute le document au bon nœud dans l'arbre
    const node = this.editNode();
    if (!node.documents) node.documents = [];
    node.documents.push(newDocument);

    // 2. Rafraîchis la dataSource pour Angular Material
    this.dataSource.data = [...this.dataSource.data];
    this.current_tab.set({ ...node });
    this.doc.update(doc => ({
      titre: '',
      file: null,
    }));
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}

