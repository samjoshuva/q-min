import { UtilsService } from './../service/utils/utils.service';
import { AuthService } from './../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { utils } from 'protractor';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  // tslint:disable-next-line:no-shadowed-variable
  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private auth: AuthService,
    private router: Router,
    private util: UtilsService,
    private storage: Storage
  ) {}
  l_email: string;
  l_password: string;

  user: any;

  ngOnInit() {}

  login() {
    this.auth.loginWithEmail(this.l_email, this.l_password);
  }

  navSignup() {
    this.router.navigate(['/signup']);
  }

  loginWithGoogle() {
    this.auth
      .webGoogleLogin()
      .then(data => {
        this.user = data.additionalUserInfo;
        alert(this.user);

        this.storage.set('user-info', this.user);

        this.router.navigate(['/home']);

        // if (this.user.isNewUser) {
        //   this.util.presentToast('Account created ');
        // }
      })
      .catch(err => {
        alert(err.message);
      });
  }
}
