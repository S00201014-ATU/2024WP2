import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit{
  newProduct: Product = {id: 0, name: '', price:0, imageUrl: '', description: ''};

  constructor(private productService:ProductService, private router:Router){ }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.productService.addProduct(this.newProduct);
    this.router.navigate(['/']);
  }
}
