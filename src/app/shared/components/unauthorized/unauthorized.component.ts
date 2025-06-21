import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {
  router=inject(Router);
  _auth_service = inject(AuthService);
  // Injecting the AuthService to manage authentication state
  constructor() {
  }
  
  retour() {
    this._auth_service.logout();
  }
}
