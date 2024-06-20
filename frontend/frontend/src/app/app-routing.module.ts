import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '', component:ProductListComponent
  },
  {
    path: 'products/:id', component:ProductDetailsComponent
  },
  {
    path: 'edit-product/:id', component:ProductEditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-product', component: ProductAddComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'register', component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
