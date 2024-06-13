import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.productService.getProductById(id).subscribe(
        (product: Product) => {
          this.product = product;
        },
        (error: any) => {
          console.error(`Error fetching product with ID ${id}:`, error);
          this.product = null; // Ensure product is null on error
          if (error.status === 404) {
            console.error('Product not found.');
            // Handle 404 error appropriately; show message or redirect
          } else {
            alert('Error fetching product. Please try again.');
          }
        }
      );
    } else {
      console.error('Invalid product ID provided.');
      this.product = null; // Ensure product is null if no ID is provided
    }
  }

  updateProduct(): void {
    if (this.product && this.product._id) {
      const { _id, ...updatedProduct } = this.product; // Exclude _id from updatedProduct

      this.productService.updateProduct(_id, updatedProduct).subscribe(
        () => {
          console.log('Product updated successfully');
          this.router.navigate(['/product', _id]);
        },
        (error: any) => {
          console.error('Error updating product:', error);
          alert('Error updating product. Please try again.');
        }
      );
    } else {
      console.error('Cannot update product: Product or product._id is null or undefined.');
    }
  }
}
