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
    id: 0,
    name: '',
    price: 0,
    imageUrl: '',
    description: ''
  };
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(): void {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.imageUrl && this.newProduct.description) {
      this.productService.addProduct(this.newProduct);
      this.router.navigate(['/']);
    } else {
      this.errorMessage = "Please fill in all fields before adding the product.";
    }
  }
}
