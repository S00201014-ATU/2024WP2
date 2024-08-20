import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Method to handle user login
  login() {
    this.authService.login(this.username, this.password).subscribe(
      res => {
        // Save the token to local storage and navigate to the homepage
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      err => {
        // Log error and show a message if login fails
        console.error('Error logging in', err);
        alert('Login failed');
      }
    )
  }
}
