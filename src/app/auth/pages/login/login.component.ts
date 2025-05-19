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
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe();
    }
  }
  logout() {
    this.authService.logout()
  }
}
