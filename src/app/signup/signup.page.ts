import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { UtilsService } from '../service/utils/utils.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  l_name: string;
  l_email: string;
  l_password: string;
  l_con_password: string;
  dob: any;
  sex: any;
  user: any;
  constructor(
    private auth: AuthService,
    private storage: Storage,
    private util: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {}

  signup() {
    if (this.l_password !== this.l_con_password) {
      this.util.presentToast('Password Mismatch');
    }
    const user = {
      name: this.l_name,
      email: this.l_email,
      pass: this.l_password,
      dob: this.dob,
      sex: this.sex
    };
    console.log(user);
    this.auth.registerWithEmail(user);
  }

  signupWithGoogle() {
    this.auth.webGoogleLogin();
  }
}
