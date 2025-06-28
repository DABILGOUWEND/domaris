import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { RouterOutlet } from '@angular/router';
import { Programme, Users } from '../../modeles/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { EntrepriseStore, ProgrammeStore, UserStore } from '../../stores/appstore';
import { AuthService } from '../../auth/services/auth.service';
import { UtilitairesService } from '../../services/utilitaires.service';
import { user } from '@angular/fire/auth';
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*";
@Component({
  selector: 'app-admin',
  imports: [ImportedModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  constructor(
    private _fb: FormBuilder
  ) {
    this.users_formGroup = this._fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      projet_ids: [[], [Validators.required]],
      entreprise_id: ['', [Validators.required]]
    });
    this.entreprise_formGroup = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      enseigne: ['', [Validators.required, Validators.minLength(5)]],
      email: [''],
      adresse: [''],
      telephone: ['', [Validators.required, Validators.minLength(8)]],
      site_web: [''],
      rccm: [''],
      ifu: [''],
      signataire: [''],

    });
    effect(() => {
      //console.log(this.entreprises())
    });
  }

  //properties
  users_formGroup: FormGroup;
  entreprise_formGroup: FormGroup;
  _is_update_users = signal(false);
  _is_update_entreprise = signal(false);
  _selected_entreprise = signal<any>(undefined);
  _selected_user = signal<any>(undefined);
  activate_usersForm = signal(false);
  activate_entrepriseForm = signal(false);
  //table columns
  user_columns: string[] = ['nom', 'prenom', 'email', 'role', 'entreprise', 'actions'];
  entreprise_columns: string[] = ['code', 'enseigne', 'email', 'adresse', 'telephone', 'site_web', 'rccm', 'ifu', 'signataire', 'actions'];



  //injections
  _programme_store = inject(ProgrammeStore);
  _auth_service = inject(AuthService);
  _utilitaires = inject(UtilitairesService);
  _users_store = inject(UserStore);
  _entreprise_store = inject(EntrepriseStore);
  _router = inject(RouterOutlet);

  //computed properties
  users = computed(() => {

    return this._users_store.users().map((users: any) => {
      return {
        ...users,
        entreprise: this.entreprises().find(x => x.id == users.entreprise_id)?.enseigne || 'Inconnu',
      };
    })
  });
  entreprises = computed(() => this._entreprise_store.allEntreprises());
  programmes = computed(() => this._programme_store.allProgrammes());
  users_dataSource = computed(() => {
    return new MatTableDataSource<any>(this.users());
  }
  );
  entreprises_dataSource = computed(() => {
    return new MatTableDataSource<any>(this.entreprises());
  });

  ngOnInit() {
    this._users_store.loadUsers();
    this._entreprise_store.loadAllData();
    this._programme_store.loadAllData();
  }
  //users
  new_user() {
    this._selected_user.set(undefined);
    this.users_formGroup.reset();
    this._is_update_users.set(false);
    this.activate_usersForm.set(true);
  }
  click_user(user: any) {
    this._selected_user.set(user);
    this.users_formGroup.patchValue({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      entreprise_id: user.entreprise_id,
      projet_ids: user.projet_ids
    })
    this._is_update_users.set(true);
    this.activate_usersForm.set(true);
  }
  submit_creationCompte() {
    if (this.users_formGroup.valid) {
      let values = this.users_formGroup.value;
      let password = this._utilitaires.generateRandomPassword(8);
      if (this._is_update_users()) {
        if (this._selected_user()) {
          let users = { ...values, id: this._selected_user()?.id };
          this._users_store.updateUser(users);
        }
      } else {
        this._users_store.addUser({ ...values, password: password });
      }
      this._selected_user.set(undefined);
      this.activate_usersForm.set(false);
    }
  }

  removeUser(user: any) {
    if (user) {
      if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`)) {
        this._users_store.removeUser(user.id);
      }
      this._selected_user.set(undefined);
    }
  }
  //entreprises
  new_entreprise() {
    this._selected_entreprise.set(undefined);
    this.entreprise_formGroup.reset();
    this._is_update_entreprise.set(false);
    this.activate_entrepriseForm.set(true);
  }
  click_entreprise(entreprise: any) {
    this._selected_entreprise.set(entreprise);
    this.entreprise_formGroup.patchValue(
      entreprise
    );
    this._is_update_entreprise.set(true);
    this.activate_entrepriseForm.set(true);
  }
  submit_creationEntreprise() {
    if (this.entreprise_formGroup.valid) {
      let values = this.entreprise_formGroup.value;
      if (this._is_update_entreprise()) {
        if (this._selected_entreprise()) {
          let entreprise = { ...values, id: this._selected_entreprise()?.id };
          this._entreprise_store.updateEntreprise(entreprise);
        }
      } else {
        this._entreprise_store.addEntreprise(values)
      }
      this._selected_entreprise.set(undefined);
    }
    this.activate_entrepriseForm.set(false);
  }
  removeEntreprise(entreprise: any) {
    if (this._selected_entreprise()) {
      let entreprise = this._selected_entreprise();
      if (confirm(`Êtes-vous sûr de vouloir supprimer l'entreprise ${entreprise.enseigne} ?`)) {
        this._entreprise_store.deleteEntreprise(entreprise.id);
      }
      this._selected_entreprise.set(undefined);
    }
  }
}
