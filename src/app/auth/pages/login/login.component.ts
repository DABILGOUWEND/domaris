import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ImportedModule } from '../../../shared/modules/imported/imported.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ImportedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  message = signal('vous êtes déconnecté');
  isLoading = signal(false);
  private fb = inject(FormBuilder);
  constructor(
    private router: Router,
    private authService: AuthService

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.message.set('connexion en cours ...');
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (res) => {
          setInterval(() => {
            this.isLoading.set(false);
            this.message.set('vous êtes connecté');
            this.router.navigate(['/accueil']);
          }, 5000);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage = err.message;
          this.message.set('vous êtes déconnecté');
           this.isLoading.set(false);
        },
        complete: () => {

        }

      }

      );
    }
  }
  logout() {
    this.authService.logout()
  }
}
