import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLoggedIn = new BehaviorSubject<boolean>(false);
  _auth=getAuth();

  constructor() { 

  }

  login(email: string, password: string): Observable<any> {
    return new Observable(observer => {
      setPersistence(this._auth, browserSessionPersistence).then(() => {
        signInWithEmailAndPassword(this._auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            this.userLoggedIn.next(true);
            observer.next(user);
            observer.complete();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            this.userLoggedIn.next(false);
            observer.error(errorMessage);
          });
      })
      .catch((error) => {
        console.error("Error setting persistence: ", error);
        observer.error(error.message);
      })

  })


}
  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  logout(): void {
    this._auth.signOut().then(() => {
      this.userLoggedIn.next(false);
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
  }

}
