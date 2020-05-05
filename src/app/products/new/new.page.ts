import { Component, OnInit } from '@angular/core';
import { Product } from '../product.js';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/app/services/auth.service.js';


@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  isLoggedIn;
  prodName;
  prodDesc;
  prodPrice;
  prodPhoto;
  statusMessage;

  constructor(
    private storage: Storage,
    private router: Router,
    private auth: AuthService,
    private productService: ProductService
  ) {
    this.auth.getLoggedIn().then((res) => {
      (res) ? this.isLoggedIn = res : this.router.navigate(['/products']);
    });
  }

  ngOnInit() {
  }

  setPreview(event) {
    const img = document.getElementById('imagePreview');
    console.log('Img:', event.target.files);
    console.log('length:', event.target.files.length);

    if (event.target.files.length === 0) {
      this.resetPreview();
    } else {
      this.displayImagePreview(img, event.target);
    }
  }

  setImage(event) {
    if (event.target.files.length !== 0) {
      this.prodPhoto = event.target.files[0];
    }
  }

  displayImagePreview(img, obj) {
    const url = window.URL.createObjectURL(obj.files[0]);
    img.src = url;
    img.onload = () => {
      window.URL.revokeObjectURL(url);
    };
  }

  resetPreview() {
    this.prodPhoto = null;
    const img = document.getElementById('imagePreview');
    img.setAttribute('src', '/assets/gray.png');
    const imgInput = document.getElementById('imageInput');
    imgInput.setAttribute('value', '');
  }

  async create() {
    this.auth.getAuthToken()
      .then((token) => {
        if (token === '') {
          this.displayMessage('Error create. Could not get authentication token.');
          this.router.navigate(['/products']);
        } else {
          const args = this.getArgs(); // Format input values for API

          // First create the product without image because
          // API image upload needs the key of the product
          this.productService.create(args, token)
            .then((result) => {
              if (typeof result.statusMessage !== 'undefined') {
                if (result.statusMessage.errcode === 0) {
                  this.productService.uploadImage(result.key, this.prodPhoto, token)
                    .then((res) => {
                      if (typeof res.statusMessage !== 'undefined') {
                        if (res.statusMessage.errcode === 0) {
                          const message = 'Product: "' + this.prodName + '", has been created successfully.';
                          alert(message);
                          this.displayMessage(message, false);
                        } else {
                          this.displayMessage(res.data.statusMessage.message);
                          this.productService.delete(result.key, token);
                        }
                      } else {
                        this.displayMessage('Unknown error, product creation failed. Please try again!');
                        this.productService.delete(result.key, token);
                      }
                    })
                    .catch((err) => {
                      this.displayMessage('imagedfg failed', err);
                      this.productService.delete(result.key, token);
                    });
                } else {
                  this.displayMessage(result.statusMessage.message);
                }
              } else if (typeof result.errcode !== 'undefined') {
                this.displayMessage(result.message);
              } else {
                this.displayMessage('Unknown error, product creation failed. Please try again!');
              }
            })
            .catch((err) => {
              console.log('Hi:', err);

              this.displayMessage(err);
            });
        }
      })
      .catch((err) => {
        this.displayMessage(err);
      });
  }

  displayMessage(message, error = true) {
    console.log('Message:', message);
    const msg = document.getElementById('statusMessage');
    if (msg) {
      (error) ? msg.style.color = 'red' : msg.style.color = 'green';
      this.statusMessage = message;
    }
  }

  getArgs() {
    // API doesnt set the default values on insert
    // DEBUGGING !!! : For some reason the product doesn't show if this date is not in the past?
    // Even if I remove the filter on read completely???
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const defaultArgs = {
      Activation_date: date,
      Active: true
    };

    const args = {
      Name: this.prodName,
      Description: this.prodDesc,
      Selling_price: this.prodPrice
    };

    // API doesnt set the default values on insert so combine them here
    return {
      ...defaultArgs,
      ...args
    };
  }
}
