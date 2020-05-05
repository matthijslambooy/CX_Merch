import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  },
  {
    path: 'product/:productid',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then( m => m.NewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
