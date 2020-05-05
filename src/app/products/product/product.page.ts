import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  product = {};
  productid = null;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productid = this.activatedRoute.snapshot.paramMap.get('productid');
    this.getProduct();
  }

  getProduct() {
    console.log('Getting product...');
    this.productService.getProduct(this.productid).subscribe(data => {
      // tslint:disable-next-line: comment-format
      this.product = data[`record`];
      console.log('Product:', this.product);
    });
  }
}
