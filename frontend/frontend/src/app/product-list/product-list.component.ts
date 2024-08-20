import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = []; // Array to hold all products
  filteredProducts: Product[] = []; // Array to hold products after filtering
  originalProducts: Product[] = []; // Array to hold the original product list
  searchTerm: string = ''; // Search term for filtering products
  selectedFilter: string = 'default'; // Selected filter option
  userIsAuthenticated: boolean = false; // User authentication status
  searchCompleted: boolean = false; // Flag to indicate when a search has been completed
  private authSubscription!: Subscription; // Subscription to auth status changes

  constructor(
    private productService: ProductService, // Service to fetch products
    private router: Router, // Router to navigate to different pages
    private authService: AuthService // Service to check authentication
  ) {}

  ngOnInit(): void {
    this.loadProducts(); // Load products when component initializes

    // Subscribe to authentication status changes
    this.authSubscription = this.authService.getAuthStatus().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated; // Update authentication status
      console.log('Authentication status changed:', isAuthenticated);  // Log for debugging
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();  // Unsubscribe from auth status changes
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products; // Store fetched products
      this.filteredProducts = [...products];  // Initialise filtered products
      this.originalProducts = [...products];  // Save original products list
    });
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(['/products', productId]); // Navigate to product details page
  }

  editProduct(productId: string): void {
    this.router.navigate(['/edit-product', productId]); // Navigate to product edit page
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product from the store?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.loadProducts(); // Reload product list after deletion
      }, error => {
        console.error('Error deleting product:', error); // Log error if deletion fails
        alert('Error deleting product. Please try again.'); // Notify user of error
      });
    }
  }

  filterProducts(): void {
    this.searchCompleted = true;  // Mark search as completed
    console.log('Search button clicked, filtering products with searchTerm:', this.searchTerm);

    if (this.searchTerm) {
        this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
        );
    } else {
        this.filteredProducts = this.products;
    }

    console.log('Filtered products:', this.filteredProducts);
  }

  // Reset the searchCompleted flag and show all products when the user starts typing in the search bar
  onSearchInputChange(): void {
    this.searchCompleted = false;
    this.filteredProducts = this.products;  // Reset filteredProducts to show all products
  }

  applyFilter(): void {
    switch (this.selectedFilter) {
      case 'az':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name)); // Sort products A-Z
        break;
      case 'za':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name)); // Sort products Z-A
        break;
      case 'priceHighLow':
        this.filteredProducts.sort((a, b) => b.price - a.price); // Sort products by price high to low
        break;
      case 'priceLowHigh':
        this.filteredProducts.sort((a, b) => a.price - b.price); // Sort products by price low to high
        break;
      default:
        this.filteredProducts = [...this.originalProducts]; // Reset to original order if no filter
        break;
    }
  }
}
