import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  successMessage = '';
  errorMessage = '';

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

}
