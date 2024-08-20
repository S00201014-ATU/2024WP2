import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) {}  // Inject Router for navigation

  // Method to determine if a route can be activated
  canActivate(): boolean {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
    if (token) {
      return true;  // Allow navigation if token exists
    } else {
      this.router.navigate(['/login']);  // Redirect to login page if no token
      return false;  // Deny access
    }
  }
}
