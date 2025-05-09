import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register({ email: this.email, password: this.password }).subscribe(response => {
      console.log('Registro OK', response);
    }, err => {
      console.error('Error en registro', err);
    });
  }
}
