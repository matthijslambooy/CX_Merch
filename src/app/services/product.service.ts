import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts() {
    const queryOptions = '"class": "Product"';
    const productsUrl = 'https://cxmerchandise.cx-develop.nl/engine/api/cxmerch/query?querydef={' + queryOptions + '}';

    return this.http.get(productsUrl);
  }

  getProduct(id: number) {
    const productUrl = 'https://cxmerchandise.cx-develop.nl/engine/api/cxmerch/record/product/' + id;
    return this.http.get(productUrl);
  }

  async create(args, token) {
    const urlCreate = 'https://cxmerchandise.cx-develop.nl/engine/api/cxmerch/record/product';
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    return this.http.post(urlCreate, args, { headers })
      .toPromise().then((response) => {
        console.log('prodres:', response);
        return response;
      }, (failure) => {
        console.log('prodfail:', failure);
        return failure;
      });
  }

  async uploadImage(id, img, token) {
    try {
      const urlUpload = 'https://cxmerchandise.cx-develop.nl/engine/api/cxmerch/upload/product/' + id + '/Image';

      const fd = new FormData();
      console.log('bla', img);
      // const imgBlob = new Blob(img, {
      //   type: img.type
      // });
      fd.append('image', img);




      const headers = {
        Authorization: 'Bearer ' + token,
        // 'Content-Type': undefined
        // 'Content-Type': 'multipart/form-data'
      };
      return this.http.post(urlUpload, fd, { headers })
        .toPromise().then((response) => {
          console.log('imgres:', response);
          return response;
        }, (failure) => {
          console.log('imgfail:', failure);
          this.delete(id, token);
          return failure;
        });
    } catch (error) {
      console.log('bsadf', error);

    }
  }

  async delete(id, token) {
    const urlDelete = 'https://cxmerchandise.cx-develop.nl/engine/api/cxmerch/record/product/' + id;
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    return this.http.delete(urlDelete, { headers }).toPromise().then((response) => response, (failure) => failure);
  }
}
