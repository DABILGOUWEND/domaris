import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportedModule } from '../../shared/modules/imported/imported.module';

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
  constructor(
    private fb: FormBuilder,
    private afAuth: Auth,
    private afs: Firestore,
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

}
