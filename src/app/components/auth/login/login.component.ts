import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(response => {
      console.log('Login OK', response);
      // Redirige si quieres: this.router.navigate(['/questions']);
    }, err => {
      console.error('Error en login', err);
    });
  }
}
