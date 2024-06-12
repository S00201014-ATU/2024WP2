import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css' // Corrected property name
})
export class ProductEditComponent implements OnInit {
  productId: number | null = null;
  product!: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.productId = +id;
      this.product = this.productService.getProductById(this.productId)!;
    } else {
      console.error("Product ID is missing from route parameters.");
    }
  }

  onSubmit(): void {
    if (this.product) { // Ensure product is not null or undefined
      this.productService.updateProduct(this.product);
      this.router.navigate(['']);
    } else {
      console.error("Product is missing. Cannot update product.");
    }
  }
}
