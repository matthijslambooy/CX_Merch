import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})

export class ProductsPage implements OnInit {
  isLoggedIn;
  products;

  constructor(
    private router: Router,
    private auth: AuthService,
    private productService: ProductService
  ) {
    this.auth.getLoggedIn().then((res) => this.isLoggedIn = res);
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    console.log('Getting products...');
    this.productService.getProducts().subscribe(data => {
      this.products = data[`recordList`];
      console.log('Products:', this.products);
    });
  }

  delete(id, name) {
    this.auth.getAuthToken()
      .then((token) => {
        if (token === '') {
          console.log('Error delete. Could not get authentication token.');
          this.router.navigate(['/products']);
        } else {
          if (confirm('Are you sure you want to delete product: \"' + name + '\"?')) {
            console.log('Delete id:', id);
            this.productService.delete(id, token)
              .then((result) => {
                console.log('Result delete():', result);
                if (result.statusMessage.errcode === 0) {
                  document.getElementById('product' + id).style.display = 'none';
                  this.router.navigate(['/products']);
                } else {
                  console.log('Something went wrong...');
                }
              })
              .catch((err) => {
                console.log('Error new.page.create():', err);
              });
          }
        }
      })
      .catch((err) => {
        console.log('Error delete():', err);
      });
  }
}
