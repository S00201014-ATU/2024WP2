import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  originalProducts: Product[] = []; // Store the original order of products
  searchTerm: string = '';
  selectedFilter: string = 'default';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];  // Copy the loaded products
      this.originalProducts = [...products];  // Keep a copy of the original order
    });
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  editProduct(productId: string): void {
    this.router.navigate(['/edit-product', productId]);
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product from the store?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.loadProducts();
      }, error => {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      });
    }
  }

  filterProducts(): void {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.products];
    }
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.selectedFilter) {
      case 'az':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceHighLow':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'priceLowHigh':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        this.filteredProducts = [...this.originalProducts]; // Reset to original order
        break;
    }
  }
}
