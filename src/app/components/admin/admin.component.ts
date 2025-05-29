import { Component, computed, inject, signal } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { RouterOutlet } from '@angular/router';
import { CreationCompteComponent } from '../creation-compte/creation-compte.component';
import { CreationProgrammeComponent } from '../creation-programme/creation-programme.component';
import { Programme } from '../../modeles/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProgrammeStore } from '../../stores/appstore';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [ImportedModule, CreationProgrammeComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  //injections
  _programme_store = inject(ProgrammeStore);
  _auth_service=inject(AuthService);

  selectedProgrammme = signal<Programme | undefined>(undefined);
  is_updated = signal(false);
  is_opened = signal(false)

  //computed signals
  displayedColumns = [
    'code',
    'nom',
     'type', 
     'statut', 
     'dateDebut', 
     'dateFin', 
     'budgetPrevu',  
      'actions'];
  donnees_phases = computed(() => {
    return new MatTableDataSource<any>(this._programme_store.getPhases());
  })
 donnees_programmes = computed(() => {
    return new MatTableDataSource<any>(this._programme_store.programmes_data());
  })
  //others data
  mformgroup: FormGroup
  constructor(
    private fb: FormBuilder
  ) {
    this.mformgroup = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      type: ['', Validators.required],
      statut: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      budgetPrevu: [null, [Validators.required, Validators.min(0)]],
      pays: ['', Validators.required],
      ville: ['', Validators.required],
      quartier: ['', Validators.required],
      responsableId: ['', Validators.required],
      code: ['', Validators.required]
    });
  }


  ngOnInit() {
    this._programme_store.loadAllData()
    this._programme_store.setSelectedId(this._auth_service.userSignal().current_projet_id)

    this.mformgroup.patchValue({
      nom: 'hello world',
    })
  }
  Modifprogramme(row: any) {
    this.selectedProgrammme.set(row)
    this.is_updated.set(true)
    this.mformgroup.patchValue(row)
  }
  AddProgramme() {
    this.is_updated.set(false);
    this.selectedProgrammme.set(undefined);
  }
  close_drawer() {
    this.is_opened.set(false)
  }
  select_programme(row: any) {
    this.selectedProgrammme.set(row())
    this.is_opened.set(true)

  }
  delete_programme(row: any) {

  }
}
