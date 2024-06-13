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
  newProduct: Product = {
    _id: '', // Initialize with an empty string or null
    name: '',
    price: 0,
    imageUrl: '',
    description: ''
  };
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(): void {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.imageUrl && this.newProduct.description) {
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
          if (err.error && err.error.error) {
            this.errorMessage = 'Error adding product: ' + err.error.error;
          } else {
            this.errorMessage = 'Error adding product. Please try again later.';
          }
        }
      });
    } else {
      this.errorMessage = "Please fill in all fields before adding the product.";
    }
  }

}
