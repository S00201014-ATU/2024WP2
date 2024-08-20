import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {

  newProduct: Product = {
    _id: '',
    name: '',
    price: 0,
    imageUrl: '',
    description: ''
  };

  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router, private authService: AuthService) {} // Inject AuthService

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect if not authenticated
    }
  }

  onSubmit(): void {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.imageUrl && this.newProduct.description) {
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
          this.errorMessage = err.error && err.error.error ? 'Error adding product: ' + err.error.error : 'Error adding product. Please try again later.';
        }
      });
    } else {
      this.errorMessage = "Please fill in all fields before adding the product.";
    }
  }

}
