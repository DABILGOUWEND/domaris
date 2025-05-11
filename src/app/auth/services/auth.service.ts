import { inject, Injectable, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //injections
  db = inject(Firestore);
    _auth = inject(Auth);

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

  }

  login(email: string, password: string): Observable<any> {
    return from(this._auth.setPersistence(browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(this._auth, email, password)
        .then((userCredential) => {
          this.userLoggedIn.set(true);
          const user = userCredential.user;
          this.affichage.set(user.email);
          this.handleCreateUser(user);
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
    })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }
  handleCreateUser(users: any) {
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
    this.userSignal.set(new_user);
    this.getallUsersByUid(users.uid).pipe(
      tap(
        (resp: any) => {
          let data = resp.data();
          console.log('data', data);
          this.userSignal.update(
            (user: any) =>
            (
              {
                'uid': user.uid,
                'email': user.email,
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
    ).subscribe()

  }
  getallUsersByUid(uid: string): Observable<any> {
    console.log('uid', uid);
    const docRef = doc(this.db, "myusers", uid);
    console.log('docRef', docRef);
    const docSnap = getDoc(docRef);
    return from(docSnap)
  }

}
