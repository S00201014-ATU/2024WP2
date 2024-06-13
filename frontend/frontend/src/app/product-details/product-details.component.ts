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
  product: Product | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      console.log(`Fetching product details for ID: ${id}`);
      this.productService.getProductById(id).subscribe(
        (product: Product) => {
          console.log('Product details fetched:', product);
          this.product = product;
        },
        (error: any) => {
          console.error('Error fetching product details:', error);
        }
      );
    } else {
      console.error("Invalid product ID provided.");
    }
  }
}
