import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from 'url';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // testemail = 'm.helderman@crossmarx.nl';
  // testpass = 'Asdfasdfasdf1!';
  urlLogin = 'https://cxmerchandise.cx-develop.nl/engine/api/cxmerch/login';

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  async login(args) {
    return new Promise((resolver, reject) => {
      this.http.post(this.urlLogin, args).subscribe((result) => {
        resolver(result);
      }, (fail) => {
        reject(fail);
      });
    });
  }

  async getLoggedIn(): Promise<boolean> {
    return this.storage.get('authhash')
      .then((hash) => {
        if (hash === null) {
          return false;
        } else if (hash === '') {
          return false;
        } else {
          return true;
          // const h = new HttpHeaders({
          //   Authorization: 'Bearer ' + hash + 'asd',
          // });
          // try {
          //   const bla = this.http.post(this.urlLogin, {}, { headers: h })
          //     .subscribe((response) => {
          //       console.log('Resut', response);
          //       return response;
          //     }, (failure) => {
          //       console.log('Faiule', failure);
          //       console.log('Hedeares', h);

          //       return failure;
          //     });
          //   console.log('hi', bla);
          // } catch (error) {
          //   console.log('Error: could not create product...', error);
          // }
          // // 'message';: 'No data in request';
        }
      })
      .catch((err) => {
        console.log('Error getLoggedIn:', err);
        return false;
      });
  }

  async getAuthToken(): Promise<string> {
    return this.storage.get('authhash')
      .then((hash) => {
        if (hash === null) {
          return '';
        } else if (hash === '') {
          return '';
        } else {
          return hash;
        }
      })
      .catch((err) => {
        console.log('Error getAuthToken:', err);
        return '';
      });
  }
}
