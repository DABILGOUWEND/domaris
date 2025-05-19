import { Component, effect, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = signal('domaris-app');
  _auth = inject(Auth);
  _auth_service = inject(AuthService);
  constructor() {
    this._auth.onAuthStateChanged(
      (userCredential) => {
        if (userCredential) {
         
        }
      }
    )

    effect(() => {
      console.log(this._auth_service.userSignal());
      console.log(this._auth_service.userLoggedIn());
    })
  }
  ngOnInit() {
   this._auth_service.autoLogin();
  }
}
