import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { PassThrough } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  loginWithEmail(email, pass) {
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(
      email,
      pass
    );
  }

  registerWithEmail(email, pass) {
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
      email,
      pass
    );
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
}
