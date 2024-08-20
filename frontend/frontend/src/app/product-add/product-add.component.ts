import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  // Initialize the newProduct object with default values
  newProduct: Product = {
    _id: '',
    name: '',
    price: 0,
    imageUrl: '',
    description: ''
  };

  // Variable to store error messages
  errorMessage: string = '';

  // Inject ProductService and Router into the component
  constructor(private productService: ProductService, private router: Router) {}

  // Method to handle form submission
  onSubmit(): void {
    // Check if all fields are filled in
    if (this.newProduct.name && this.newProduct.price && this.newProduct.imageUrl && this.newProduct.description) {

      // Call the addProduct method from ProductService
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          // Redirect to homepage after successful product addition
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error adding product:', err);

          // Display error message if there is an issue
          if (err.error && err.error.error) {
            this.errorMessage = 'Error adding product: ' + err.error.error;
          } else {
            this.errorMessage = 'Error adding product. Please try again later.';
          }
        }
      });

    } else {
      // Show an error if any fields are missing
      this.errorMessage = "Please fill in all fields before adding the product.";
    }
  }

}
