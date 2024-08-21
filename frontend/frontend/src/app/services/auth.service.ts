import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // API URL for authentication
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());  // Track authentication status with BehaviorSubject

  constructor(private http: HttpClient, private router: Router) {}  // Inject HttpClient and Router
  // Provide an observable for other components to subscribe to for auth status
  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
  // Register a new user
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password }); // Send user data to the register endpoint
  }
  // Login a user and store the authentication token
  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.setToken(response.token); // Store the token in localStorage
            this.authStatus.next(true);  // Update auth status to logged in
            console.log("User logged in, token stored"); // Debugging message
            alert("Login successful!");  // Notify the user of successful login
            this.router.navigate(['/products']);  // Redirect to products page
          }
        })
      );
  }
  // Logout the user and remove the token
  logout(): void {
    console.log("Logout function called");  // Debugging message
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    this.authStatus.next(false);  // Update auth status to logged out
    alert("You have been logged out.");  // Notify the user of successful logout
    console.log("User logged out, token removed"); // Debugging message
    this.router.navigate(['/login']);  // Redirect to login page
  }
  // Store the authentication token in localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  // Retrieve the authentication token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  // Check if the user is authenticated based on token existence
  isAuthenticated(): boolean {
    return !!this.getToken();  // Return true if token exists, otherwise false
  }
}
