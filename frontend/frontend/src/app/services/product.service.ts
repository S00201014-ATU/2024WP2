import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://two024wp2-backend.onrender.com/products'; // Updated API URL for product operations

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to get Authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Retrieve the authentication token from AuthService
    return new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the token in the headers
  }

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.getAuthHeaders() }); // Get all products with auth headers
  }

  // Fetch a product by its ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }); // Get product by ID with auth headers
  }

  // Add a new product (requires authentication)
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.getAuthHeaders() }); // Post a new product with auth headers
  }

  // Update a product by its ID (requires authentication)
  updateProduct(id: string, updatedProduct: Partial<Product>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedProduct, { headers: this.getAuthHeaders() }); // Update product by ID with auth headers
  }

  // Delete a product by its ID (requires authentication)
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }); // Delete product by ID with auth headers
  }
}
