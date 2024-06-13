import { ProductEditComponent } from './product-edit/product-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';

const routes: Routes = [
  {
    path: '', component:ProductListComponent
  },
  {
    path: 'products/:id', component:ProductDetailsComponent
  },
  {
    path: 'edit-product/:id', component:ProductEditComponent
  },
  {
    path: 'add-product', component: ProductAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
