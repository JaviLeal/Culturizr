import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  showLogin: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

login() {
  this.authService.login(this.email, this.password).subscribe({
    next: (response) => {
      console.log('Login successful', response);
      this.successMessage = 'Logueo exitoso';
      this.errorMessage = '';
      // Guarda estado
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log('Redirigiendo a home');
      this.router.navigate(['/home']); // Redirección
    },
    error: (err) => {
      console.error('Login error', err);
      this.errorMessage = 'Error en el logueo';
      this.successMessage = '';
    }
  });
  }
   register() {
  this.authService.register(this.username, this.email, this.password).subscribe({
    next: (response) => {
      console.log('Registration successful', response);
      this.successMessage = 'Registro exitoso';
      this.errorMessage = '';
       // Guarda estado
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log('Redirigiendo a home');
      this.router.navigate(['/home']); // Redirección
    },
    error: (err) => {
      console.error('Registration error', err);
      this.errorMessage = 'Error en el registro';
      this.successMessage = '';
    }
  });
  }
}
