import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId: number | null = null;
  product: Product = {
    _id: 0,
    name: '',
    price: 0,
    imageUrl: '',
    description: ''
  };
  errorMessage: string = '';

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.productId = +id;
      const product = this.productService.getProductById(this.productId);
      if (product) {
        this.product = product;
      } else {
        console.error("Product not found.");
      }
    } else {
      console.error("Product ID is missing from route parameters.");
    }
  }

  onSubmit(): void {
    if (this.product.name && this.product.price && this.product.imageUrl && this.product.description) {
      this.productService.updateProduct(this.product);
      this.router.navigate(['/']);
    } else {
      this.errorMessage = "Please fill in all fields before updating the product.";
    }
  }
}
