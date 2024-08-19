import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');  // Returns true if token exists, false otherwise
  }

  // Logout function to clear the token and redirect to login page
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
