import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Product } from './../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const productId = +id;
      const foundProduct = this.productService.getProductById(productId);
      if (foundProduct !== undefined) {
        this.product = foundProduct;
      } else {
        console.error(`Product with ID ${productId} not found.`);
      }
    } else {
      console.error("Product ID is missing from route parameters.");
    }
  }
}
