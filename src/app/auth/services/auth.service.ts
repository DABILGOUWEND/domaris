import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {  from, Observable, of, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //injections
  db = inject(Firestore);
  _auth = inject(Auth);
  platformId = inject(PLATFORM_ID)
  isBrowser: boolean;
  router = inject(Router);
  //signals
  token = signal('');
  userLoggedIn = signal(false);
  loadings = signal(false);
  userSignal = signal<any | undefined>(undefined);
  current_projet_id = signal<string | undefined>("1");
  list_projet = signal<string[]>([]);
  message = signal('déconnecté');
  affichage = signal<string | null | undefined>('')

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId)
  }

  login(email: string, password: string): Observable<any> {
    return from(this._auth.setPersistence(browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(this._auth, email, password)
        .then((userCredential) => {
          this.userLoggedIn.set(true);
          const user = userCredential.user;
          this.affichage.set(user.email);
          this.handleCreateUser(user).subscribe();
          this.router.navigate(['/layout']);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        })
    }))
  }
  getUserLoggedIn(): Observable<boolean> {
    return of(this.userLoggedIn());
  }

  logout(): void {
    this._auth.signOut().then(() => {
      this.userLoggedIn.set(false);
      this.userSignal.set(undefined);
      this.current_projet_id.set(undefined);
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }
  handleCreateUser(users: any):Observable<any> {
    let new_user: any = {
      uid: users.uid,
      email: users.email,
      token: this.token(),
      role: '',
      entreprise_id: '',
      projet_id: [''],
      current_projet_id: '',
      username: ''
    }
    return this.getallUsersByUid(users.uid).pipe(
      tap(
        (resp: any) => {
          let data = resp.data();
          this.userSignal.update(
            (user: any) =>
            (
              {
                'uid': new_user.uid,
                'email': new_user.email,
                'token': this.token(),
                'role': data.role,
                'username': data.username,
                'entreprise_id': data.entreprise_id,
                'projet_id': data.projet_id,
                'current_projet_id': data.projet_id[0]
              }
            )
          )
          localStorage.setItem('user', JSON.stringify(this.userSignal()));
          this.current_projet_id.set(data.projet_id[0]);
        }
      )
    )

  }
  getallUsersByUid(uid: string): Observable<any> {
    const docRef = doc(this.db, "myusers", uid);
    const docSnap = getDoc(docRef);
    return from(docSnap)
  }
  autoLogin() {
    if (this.isBrowser) {
      let data = localStorage.getItem('user');
      if (data) {
        const dataparse = JSON.parse(data);
        this.userSignal.set(dataparse);
        this.userLoggedIn.set(true);
        this.current_projet_id.set(this.userSignal()?.current_projet_id);
      }
    }
  }
}
