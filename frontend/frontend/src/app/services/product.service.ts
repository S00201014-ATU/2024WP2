import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to get Authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Get token using AuthService
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Fetch a product by its ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Add a new product (requires authentication)
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.getAuthHeaders() });
  }

  // Update a product by its ID (requires authentication)
  updateProduct(id: string, updatedProduct: Partial<Product>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedProduct, { headers: this.getAuthHeaders() });
  }

  // Delete a product by its ID (requires authentication)
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
