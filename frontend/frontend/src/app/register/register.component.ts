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

  constructor(private authService:AuthService, private router:Router) {}

  register(){
    this.authService.register(this.username, this.password).subscribe(
      res => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      err => {
        console.error('Error registering', err);
        alert('Registration failed');
      }
    );
  }
}
