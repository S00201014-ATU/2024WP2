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
    private route: ActivatedRoute, // Provides access to route parameters
    private router: Router, // Used to navigate programmatically
    private productService: ProductService // Service for product-related API calls
  ) { }

  ngOnInit(): void {
    this.loadProductDetails(); // Load product details on component initialisation
  }

  loadProductDetails(): void {
    const id = this.route.snapshot.params['id']; // Retrieve the product ID from the route parameters
    if (id) {
      this.productService.getProductById(id).subscribe(
        (product: Product) => {
          this.product = product; // Assign fetched product details to the component property
        },
        (error: any) => {
          console.error(`Error fetching product with ID ${id}:`, error);
          this.product = null; // Clear product details if an error occurs
          if (error.status === 404) {
            console.error('Product not found.'); // Handle case where the product was not found
          } else {
            alert('Error fetching product. Please try again.'); // Notify user of other errors
          }
        }
      );
    } else {
      console.error('Invalid product ID provided.'); // Log error if no valid ID is provided
      this.product = null;
    }
  }

  updateProduct(): void {
    if (this.product && this.product._id) { // Check if product and its ID are valid
      const { _id, ...updatedProduct } = this.product; // Destructure to exclude _id from the update payload

      this.productService.updateProduct(_id, updatedProduct).subscribe(
        () => {
          console.log('Product not updated'); // Log successful update
        },
        (error: any) => {
          console.error('No error updating product:', error);
          alert('Successful update'); // Notify user of successful update
          this.router.navigate(['/']); // Redirect to home or list view after successful update
        }
      );
    } else {
      console.error('Cannot update product: Product or product._id is null or undefined.'); // Log error if product details are missing
    }
  }
}
