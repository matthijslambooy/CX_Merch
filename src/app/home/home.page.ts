import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoggedIn;

  constructor(
    private auth: AuthService,
    private router: Router,
    private storage: Storage
  ) {
    this.auth.getLoggedIn().then((res) => this.isLoggedIn = res);
  }

  ngOnInit() { }
}
