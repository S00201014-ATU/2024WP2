import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Basic validation to check if both fields are filled
    if (!this.username || !this.password) {
      alert('Please fill out both the username and password fields.');
      return;
    }

    // Call the AuthService to register the new user
    this.authService.register(this.username, this.password).subscribe(
      res => {
        alert('Registration successful');
        // Navigate to the login page after successful registration
        this.router.navigate(['/login']);
      },
      err => {
        console.error('Error registering:', err);

        // Provide more specific error messaging
        if (err.status === 400) {
          alert('Username already taken. Please choose another.');
        } else {
          alert('Registration failed. Please try again later.');
        }
      }
    );
  }
}
