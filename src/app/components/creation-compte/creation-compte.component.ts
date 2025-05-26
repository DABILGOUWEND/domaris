import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-creation-compte',
  imports: [ImportedModule],
  templateUrl: './creation-compte.component.html',
  styleUrl: './creation-compte.component.scss'
})
export class CreationCompteComponent {
   signupForm: FormGroup;
  roles = ['Utilisateur', 'Chef de projet', 'Admin'];
  errorMessage = '';
  successMessage = '';
  _auth_service = inject(AuthService);
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

 onSubmit() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }
    this.errorMessage = '';
    this.successMessage = '';
    const formData = this.signupForm.value;
    this._auth_service.register(
      formData.email,
      formData.password,
      formData.prenom + ' ' + formData.nom,
      formData.role
    ).subscribe({
      next: () => {
        this.successMessage = 'Compte créé avec succès !';
        this.router.navigate(['/layout']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors de la création du compte.';
      }
    });
  }
}
