import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Fixed typo: should be styleUrls
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      res => {
        // Token storage is now handled inside AuthService, so no need to set it here manually
        this.router.navigate(['/']);  // Navigate to home page or another route after successful login
      },
      err => {
        console.error('Error logging in', err);
        alert('Login failed');
      }
    );
  }
}
