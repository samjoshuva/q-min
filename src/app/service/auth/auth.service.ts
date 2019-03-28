import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { PassThrough } from 'stream';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform
  ) {}

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
    // this.afAuth.auth.signIn
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: 'your-webClientId-XYZ.apps.googleusercontent.com',
        offline: true,
        scopes: 'profile email'
      });

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );
    } catch (err) {
      console.log(err);
    }
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
}
