import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // Required for running Angular in the browser

import { AppRoutingModule } from './app-routing.module'; // Import routing configuration
import { AppComponent } from './app.component'; // Main app component
import { ProductListComponent } from './product-list/product-list.component'; // Component to display list of products
import { ProductDetailsComponent } from './product-details/product-details.component'; // Component for showing product details
import { ProductEditComponent } from './product-edit/product-edit.component'; // Component for editing products
import { FormsModule } from '@angular/forms'; // Import FormsModule for handling forms
import { ProductAddComponent } from './product-add/product-add.component'; // Component for adding new products
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import for animations
import { NavbarComponent } from './navbar/navbar.component'; // Component for navigation bar
import { HttpClientModule } from '@angular/common/http'; // Import for making HTTP requests
import { LoginComponent } from './login/login.component'; // Component for user login
import { RegisterComponent } from './register/register.component'; // Component for user registration

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductEditComponent,
    ProductAddComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, // Required for Angular apps running in the browser
    AppRoutingModule, // Import routing module to handle navigation
    FormsModule, // Import for template-driven forms
    HttpClientModule // Import for making HTTP requests to the server
  ],
  providers: [
    provideAnimationsAsync() // Provide support for asynchronous animations
  ],
  bootstrap: [AppComponent] // Root component to bootstrap the application
})
export class AppModule { }
