import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UtilsService } from '../utils/utils.service';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  constructor(
    public afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private afs: AngularFirestore,
    private storage: Storage,
    private util: UtilsService,
    private router: Router
  ) {}

  updateProfile(user) {}

  async loginWithEmail(email, pass) {
    try {
      const result = await this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(
        email,
        pass
      );
      console.log(result.additionalUserInfo);
      const user = this.afs
        .collection('users', ref => ref.where('email', '==', email))
        .snapshotChanges()
        .pipe(
          map(actions =>
            actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        );
      console.log(user);
      // this.setUser(result);
    } catch (err) {
      this.util.presentToast(err.message);
    }
  }

  async registerWithEmail(user) {
    try {
      const data = await this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
        user.email,
        user.pass
      );
      console.log(data);
      this.afs.collection('users').add(user);
      this.setUser(user);
    } catch (err) {
      this.util.presentToast(err.message);
    }
  }

  private setUser(user) {
    this.storage.set('user-info', user);
    this.router.navigate(['/home']);
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async webGoogleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return credential;
    } catch (err) {
      console.log(err);
    }
  }

  async nativeGoogleLogin() {
    try {
      const gplusUser = await this.gplus.login({
        webClientId:
          '180418734625-c4tl2gqfl4r3ve0dscloepuadsr5vh49.apps.googleusercontent.com',
        offline: true,
        scopes: 'profile email'
      });

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );
    } catch (err) {
      alert(err.message);
    }
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
}
