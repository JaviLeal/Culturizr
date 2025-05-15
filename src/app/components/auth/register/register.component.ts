import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  successMessage = '';
  errorMessage = '';

constructor(private authService: AuthService, private router: Router) {}

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
