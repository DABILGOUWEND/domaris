import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'domaris-app';
  _auth=inject(Auth);
  constructor() {
    this._auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user);
        console.log("User ID:", user.uid);
        console.log("User Email:", user.email);
      } else {
        console.log("No user is signed in.");
      }
    });
  }
  ngOnInit() {
    this._auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user);
      } else {
        console.log("No user is signed in.");
      }
    });
  }
}
