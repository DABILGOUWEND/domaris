import { Component, computed, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { AuthService } from '../../auth/services/auth.service';
import { EntrepriseStore, ProgrammeStore } from '../../stores/appstore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creation-compte',
  imports: [ImportedModule],
  templateUrl: './creation-compte.component.html',
  styleUrl: './creation-compte.component.scss'
})
export class CreationCompteComponent {
  _programmes_store = inject(ProgrammeStore);
  _entreprise_store = inject(EntrepriseStore);
  _auth_service = inject(AuthService);

  signupForm: FormGroup;
  tableau = [
    { id: 'admin', valeur: "administrateur" },
    { id: 'mo', valeur: "maître d'ouvrage" },
    { id: 'moe', valeur: "maître d'oeuvre" },
    { id: 'chef_projet', valeur: "chef de projet" },
    { id: 'entreprise', valeur: "entreprise" }
  ];
  tableauProgrammes = computed(() =>
    this._programmes_store.programmes_data().map((programme) => ({
      id: programme.id,
      valeur: programme.nom
    }))
  );
  tableauEntreprises = computed(() =>
    this._entreprise_store.allEntreprises().map((entreprise) => ({
      id: entreprise.id,
      valeur: entreprise.enseigne
    }))
  );

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      entreprise: ['', Validators.required],
      programme: [[], Validators.required] // tableau vide pour multi-select
    });
  }

  ngOnInit() {
    this._programmes_store.loadAllData();
    this._entreprise_store.loadAllData();
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;
    const formData = this.signupForm.value;
    this._auth_service.register(
      formData.email,
      formData.password,
      formData.role,
      `${formData.prenom} ${formData.nom}`,
      formData.entreprise,
      formData.programme
    ).subscribe({
      next: () => {
        this.successMessage = 'Compte créé avec succès !';
        this.isLoading = false;
        this.snackBar.open('Compte créé avec succès !', 'Fermer', {
          duration: 5000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/layout']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors de la création du compte.';
        this.isLoading = false;
      }
    });
  }
}
