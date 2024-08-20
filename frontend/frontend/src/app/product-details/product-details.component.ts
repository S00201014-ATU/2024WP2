import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // Holds the product details; initialised as null
  product: Product | null = null;

  // Injecting ActivatedRoute to access route parameters and ProductService to fetch product data
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  // Runs when the component is initialised
  ngOnInit(): void {
    this.loadProductDetails(); // Load product details on initialisation
  }

  // Method to load product details based on the route parameter
  loadProductDetails(): void {
    const id = this.route.snapshot.params['id']; // Get the product ID from the URL
    if (id) {
      console.log(`Fetching product details for ID: ${id}`);

      // Call the service to fetch product details by ID
      this.productService.getProductById(id).subscribe(
        (product: Product) => {
          console.log('Product details fetched:', product);
          this.product = product; // Assign fetched product data to the product variable
        },
        (error: any) => {
          console.error('Error fetching product details:', error); // Log an error if fetching fails
        }
      );
    } else {
      console.error("Invalid product ID provided."); // Log an error if the ID is invalid
    }
  }
}
