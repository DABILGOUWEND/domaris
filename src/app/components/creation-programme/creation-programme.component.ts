import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { ProgrammeStore } from '../../stores/appstore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { countries } from "../../modeles/pays"
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';

import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { child } from '@angular/fire/database';
import { phases } from '../../modeles/models';
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

  // signals inputs
  isUpdated = input.required<boolean>();
  donneesProgramme = input<any>();
  is_opened = input<boolean>();
  donnees_phases = input<any>();
  programmeForm = input.required<FormGroup>();
  phasesFormGroup = input.required<FormGroup>();

  // output
  close_event = output();

  // computed signals
  Phases = computed(() => {
    return this.donneesProgramme() != undefined ? this.donneesProgramme()?.phases : [];
  });

  // others data
  types = ['Résidentiel', 'Commercial', 'Mixte'];
  statuts = ['Planifié', 'En cours', 'Terminé', 'Suspendu'];
  pays = my_countries;
  phasesForm: FormGroup;
  budgetsForm: FormGroup;
  depensesForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  editNode: any = null;
  editMode: 'add' | 'edit' | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.phasesForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
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
  }

  confirmAddChild(node: any, inputValue: string) {
    if (!node.children) node.children = [];
    node.children.push({ nom: inputValue, children: [] });
    this.dataSource.data = [...this.dataSource.data];
    this.editNode = null;
    this.editMode = null;
  }

  // Edition d'une phase
  startEdit(node: any) {
    this.editNode = node;
    this.editMode = 'edit';
  }

  confirmEdit(node: any, inputValue: string) {
    node.nom = inputValue;
    this.dataSource.data = [...this.dataSource.data];
    this.editNode = null;
    this.editMode = null;
  }

  cancelEdit() {
    this.editNode = null;
    this.editMode = null;
  }

  // Suppression d'une phase ou sous-phase
  deleteNode(node: any) {
    const removeNode = (nodes: any[]) => {
      const idx = nodes.indexOf(node);
      if (idx > -1) {
        nodes.splice(idx, 1);
        return true;
      }
      for (const n of nodes) {
        if (n.children && removeNode(n.children)) return true;
      }
      return false;
    };
    removeNode(this.dataSource.data);
    this.dataSource.data = [...this.dataSource.data];
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
        phases: this.donneesProgramme()?.phases || [],
      });
    } else {
      let date = new Date();
      this._programme_store.addProgramme({
        ...formData,
        dateDebut: formData.dateDebut.toLocaleDateString(),
        dateFin: formData.dateFin.toLocaleDateString(),
        createdAt: date,
        updatedAt: date,
        phases: [
          // ...exemple de phases par défaut...
        ],
      });
    }
    this.close_event.emit();
  }

  close() {
    this.close_event.emit();
  }

  save() {
    // Optionnel : logique de sauvegarde supplémentaire
  }
}

