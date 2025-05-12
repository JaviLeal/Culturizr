import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

login() {
  this.authService.login(this.email, this.password).subscribe({
    next: (response) => {
      console.log('Login successful', response);
    },
    error: (err) => {
      console.error('Login error', err);
    }
  });
}

}
