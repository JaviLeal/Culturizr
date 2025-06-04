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
        console.log('Login successful response:', response);

        if (response && response.id) {
          localStorage.setItem('userId', response.id);
          localStorage.setItem('username', response.username);
          this.successMessage = 'Logueo exitoso';
          this.errorMessage = '';
          this.router.navigate(['/home']);
        } else if (response && response.user && response.user.id) {
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('username', response.user.username);
          this.successMessage = 'Logueo exitoso';
          this.errorMessage = '';
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Credenciales inválidas o respuesta inesperada';
          this.successMessage = '';
        }
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
        console.log('Registration successful response:', response);

        if (response && response.id) {
          localStorage.setItem('userId', response.id);
          localStorage.setItem('username', response.username);
          this.successMessage = 'Registro exitoso';
          this.errorMessage = '';
          this.router.navigate(['/home']);
        } else if (response && response.user && response.user.id) {
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('username', response.user.username);
          this.successMessage = 'Registro exitoso';
          this.errorMessage = '';
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Error en el registro o respuesta inesperada';
          this.successMessage = '';
        }
      },
      error: (err) => {
        console.error('Registration error', err);
        this.errorMessage = 'Error en el registro';
        this.successMessage = '';
      }
    });
  }
}
