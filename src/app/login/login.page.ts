import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoggedIn;
  username;
  password;
  errorMessage;

  constructor(
    private storage: Storage,
    private router: Router,
    private auth: AuthService
  ) {
    this.auth.getLoggedIn().then((res) => this.isLoggedIn = res);
  }

  ngOnInit() {
  }

  async login() {
    const args = {
      loginname: this.username,
      password: this.password
    };

    console.log('Args:', args);

    const result = await this.auth.login(args).then(res => res).catch(res => res);

    if (result.status == 403) {
      console.log('Login failed!');
      this.errorMessage = 'Unknown credentials, please try again.';
    } else if (result.statusMessage.errcode == 0) {
      console.log('Welcome!');
      this.storage.set('authhash', result.authhash);
      this.storage.set('isLoggedIn', true);
      this.router.navigate(['/products']);
    } else {
      console.log('Something went wrong...');
    }
  }

  async logout() {
    this.storage.set('isLoggedIn', false);
    this.storage.set('authhash', '');
    this.router.navigate(['/home']);
  }

  resetErrors() {
    this.errorMessage = '';
  }
}
