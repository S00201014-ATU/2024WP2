import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());  // BehaviorSubject to track auth status

  constructor(private http: HttpClient) {}

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
          }
        })
      );
  }

  // Store token in localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Logout user and remove token from localStorage
  logout(): void {
    localStorage.removeItem('authToken');
    this.authStatus.next(false);  // Notify subscribers of the logout
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();  // Returns true if the token exists, false otherwise
  }
}
