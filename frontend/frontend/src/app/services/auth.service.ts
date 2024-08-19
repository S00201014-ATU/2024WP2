import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';  // Import Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());  // BehaviorSubject to track auth status

  constructor(private http: HttpClient, private router: Router) {}  // Inject Router

  // Observable for components to subscribe to
  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  // Register new user
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  // Login user and automatically store the token
  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.setToken(response.token);
            this.authStatus.next(true);  // Notify subscribers of the login
            console.log("User logged in, token stored");
            alert("Login successful!");  // Show alert message to the user
            this.router.navigate(['/products']);  // Redirect to product list
          }
        })
      );
  }

  // Logout user and remove token from localStorage
  logout(): void {
    console.log("Logout function called");  // Debugging log
    localStorage.removeItem('authToken');
    this.authStatus.next(false);  // Notify subscribers of the logout
    alert("You have been logged out.");  // Show alert when user logs out
    console.log("User logged out, token removed");
    this.router.navigate(['/login']);  // Redirect to the login page after logout
  }

  // Store token in localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();  // Returns true if the token exists, false otherwise
  }
}
