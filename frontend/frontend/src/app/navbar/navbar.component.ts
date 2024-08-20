import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // Inject Router and AuthService into the component
  constructor(private router: Router, private authService: AuthService) {}

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Handle user logout
  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(['']); // Redirect to the product list phae after logout
  }
}
