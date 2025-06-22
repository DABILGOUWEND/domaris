import { Component, computed, effect, inject, signal } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/services/auth.service';
import { UtilitairesService } from '../../services/utilitaires.service';
import { ProgrammeStore, UserStore } from '../../stores/appstore';
import { CreationProgrammeComponent } from '../creation-programme/creation-programme.component';

@Component({
  selector: 'app-programmes',
  imports: [ ImportedModule,CreationProgrammeComponent ],
  templateUrl: './programmes.component.html',
  styleUrl: './programmes.component.scss'
})
export class ProgrammesComponent {
//injections
  _programme_store = inject(ProgrammeStore);
  _auth_service = inject(AuthService);
  _utilitaires = inject(UtilitairesService);
  _users_store = inject(UserStore);
  //signals
  selectedProgrammme = signal<any | undefined>(undefined);
  is_updated = signal(false);
  is_opened = signal(false);
  //computed signals
  donnees_programmes = computed(() => {
    return new MatTableDataSource<any>(this._programme_store.allProgrammes().sort(
      (a, b) => {
        return a.nom.localeCompare(b.nom);
      }
    )
    );
  })
  //others data
  programme_formgroup: FormGroup
  phasesformgroup: FormGroup
  displayedColumns = [
    'code',
    'nom',
    'type',
    'statut',
    'dateDebut',
    'dateFin',
    'budgetPrevu',
    'actions'];
  constructor(
    private fb: FormBuilder
  ) {
    this.programme_formgroup
      = this.fb.group({
        nom: ['', Validators.required],
        description: [''],
        type: ['', Validators.required],
        statut: ['', Validators.required],
        dateDebut: [new Date(), Validators.required],
        dateFin: [new Date(), Validators.required],
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
    this.programme_formgroup.patchValue({
      ...row,
      dateDebut: this._utilitaires.convertDate(row.dateDebut),
      dateFin: this._utilitaires.convertDate(row.dateFin),
    });
    this.is_opened.set(true);
    this.is_updated.set(true);
    this._programme_store.setProgrammeIs(row.id);
  }
  delete_programme(id: string) {
    if (confirm("Voulez-vous vraiment supprimer ce programme ?"))
      this._programme_store.removeProgramme(id)
  }
  add_programme() {
    this.programme_formgroup.reset();
    this.is_updated.set(false);
    this.selectedProgrammme.set(undefined);
    this.is_opened.set(true);
  }
  save_data(data: any) {
    let mydata = { ...this.selectedProgrammme(), phases: data }
    this._programme_store.updateProgramme(mydata)
  }
}
