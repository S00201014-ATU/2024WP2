import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
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
          this.product = null;
          if (error.status === 404) {
            console.error('Product not found.');

          } else {
            alert('Error fetching product. Please try again.');
          }
        }
      );
    } else {
      console.error('Invalid product ID provided.');
      this.product = null;
    }
  }

  updateProduct(): void {
    if (this.product && this.product._id) {
      const { _id, ...updatedProduct } = this.product;

      this.productService.updateProduct(_id, updatedProduct).subscribe(
        () => {
          console.log('Product not updated');
        },
        (error: any) => {
          console.error('No error updating product:', error);
          alert('Successful update');
          this.router.navigate(['/']);
        }
      );
    } else {
      console.error('Cannot update product: Product or product._id is null or undefined.');
    }
  }
}
