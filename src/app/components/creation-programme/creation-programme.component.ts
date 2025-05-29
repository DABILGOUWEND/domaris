import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { ProgrammeStore } from '../../stores/appstore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { countries } from "../../modeles/pays"
import { Programme } from '../../modeles/models';
// Assuming you have a file with country data
const my_countries = countries; // Extracting country names
@Component({
  selector: 'app-creation-programme',
  imports: [ImportedModule],
  templateUrl: './creation-programme.component.html',
  styleUrl: './creation-programme.component.scss'
})
export class CreationProgrammeComponent {
  _programme_store = inject(ProgrammeStore);
  programmeForm=input.required<FormGroup>()
  phasesForm: FormGroup;
  budgetsForm: FormGroup;
  depensesForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';


  //inputs
  isUpdated=input.required()
  donneesProgramme = input<Programme>();
  is_opened=input();
  //output 
  close_event=output()
  //computed signals
  Phases=computed(()=>{
    return this.donneesProgramme()!=undefined? this.donneesProgramme()?.phases:[]
  })

  types = ['Résidentiel', 'Commercial', 'Mixte'];
  statuts = ['Planifié', 'En cours', 'Terminé', 'Suspendu'];
  pays = my_countries;

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
    intitule:['', Validators.required],
    montant_htva:['', Validators.required],
    date: ['', Validators.required],
    description:['', Validators.required],
    url_document: ['', Validators.required],
    });

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
    if(this.isUpdated()){
      
      let date=new Date();
      this._programme_store.updateProgramme({
        ...formData,
        id: this.donneesProgramme()?.id,
        dateDebut:formData.dateDebut.toLocaleDateString(),
        dateFin:formData.dateFin.toLocaleDateString(),
        updatedAt: date
      })
    }else{
      let date=new Date();
      this._programme_store.addProgramme({
        ...formData,
        dateDebut:formData.dateDebut.toLocaleDateString(),
        dateFin:formData.dateFin.toLocaleDateString(),
        createdAt:date,
        updatedAt: date
      })
    }
  }
  close(){
    this.close_event.emit()
  }
  save(){
  }
}

