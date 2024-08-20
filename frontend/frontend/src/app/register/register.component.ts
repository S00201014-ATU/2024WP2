import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corrected from styleUrl to styleUrls
})
export class RegisterComponent {

  username: string = ''; // Stores the username input
  password: string = ''; // Stores the password input

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Check if both username and password fields are filled
    if (!this.username || !this.password) {
      alert('Please fill out both the username and password fields.'); // Alert if fields are empty
      return;
    }

    // Call AuthService to register the new user
    this.authService.register(this.username, this.password).subscribe(
      res => {
        alert('Registration successful'); // Alert on successful registration
        this.router.navigate(['/login']); // Navigate to login page after registration
      },
      err => {
        console.error('Error registering:', err); // Log any registration errors

        // Provide specific error messages based on the error status
        if (err.status === 400) {
          alert('Username already taken. Please choose another.'); // Alert if username is already taken
        } else {
          alert('Registration failed. Please try again later.'); // General alert for other errors
        }
      }
    );
  }
}
