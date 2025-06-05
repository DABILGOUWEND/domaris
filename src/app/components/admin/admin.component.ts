import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { RouterOutlet } from '@angular/router';
import { CreationCompteComponent } from '../creation-compte/creation-compte.component';
import { CreationProgrammeComponent } from '../creation-programme/creation-programme.component';
import { Programme } from '../../modeles/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { ProgrammeStore, UserStore } from '../../stores/appstore';
import { AuthService } from '../../auth/services/auth.service';
import { UtilitairesService } from '../../services/utilitaires.service';

@Component({
  selector: 'app-admin',
  imports: [ImportedModule, CreationProgrammeComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  //injections
  _programme_store = inject(ProgrammeStore);
  _auth_service = inject(AuthService);
  _utilitaires = inject(UtilitairesService);
  _users_store = inject(UserStore);

  
  //signals
  selectedProgrammme = signal<any | undefined>(undefined);
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
    return new MatTableDataSource<any>(this._programme_store.allProgrammes().map(resp =>
    ({
      ...resp,
      dateDebut: resp.dateDebut,
      dateFin: resp.dateFin
    })
    ).sort((a, b) => {
      return a.nom.localeCompare(b.nom);
    }
    )
    );
  })
  
  //others data
  mformgroup: FormGroup
  phasesformgroup: FormGroup

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
    this.phasesformgroup = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      type: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      responsableId: ['', Validators.required]
    });
    effect(() => {
    })
  }
  ngOnInit() {
    this._users_store.loadUsers();
    this._programme_store.loadAllData()
    if (this._auth_service.userSignal()) {
      this._programme_store.setProgrammeIs(this._auth_service.userSignal().projet_id);
    }

  }

  close_drawer() {
    this.is_opened.set(false)
  }
  select_programme(row: any) {
    this.selectedProgrammme.set(row);
    this.mformgroup.patchValue({
      ...row,
      dateDebut: this._utilitaires.convertDate(row.dateDebut),
      dateFin: this._utilitaires.convertDate(row.dateFin),
    });
    this.is_opened.set(true);
    this.is_updated.set(true);
    this._programme_store.setProgrammeIs(row.id);
  }
  delete_programme(row: any) {
  }
  add_programme() {
    this.mformgroup.reset();
    this.is_updated.set(false);
    this.selectedProgrammme.set(undefined);
    this.is_opened.set(true);
  }
}
