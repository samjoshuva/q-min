import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

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
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  signup() {
    this.auth.registerWithEmail(this.l_email, this.l_password);
  }

  signupWithGoogle() {
    this.auth.loginWithGoogle();
  }
}
