import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  // Import RouterModule and Routes for routing
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '', component: ProductListComponent  // Default route showing the product list
  },
  {
    path: 'products/:id', component: ProductDetailsComponent  // Route for viewing product details by ID
  },
  {
    path: 'edit-product/:id', component: ProductEditComponent  // Route for editing a product by ID
  },
  {
    path: 'add-product', component: ProductAddComponent  // Route for adding a new product
  },
  {
    path: 'login', component: LoginComponent  // Route for user login
  },
  {
    path: 'register', component: RegisterComponent  // Route for user registration
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configure the router with the defined routes
  exports: [RouterModule]  // Export RouterModule to use in the app
})
export class AppRoutingModule { }
