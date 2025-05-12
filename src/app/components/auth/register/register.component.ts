import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

register() {
  this.authService.register(this.username, this.email, this.password).subscribe({
    next: (response) => {
      console.log('Registration successful', response);
    },
    error: (err) => {
      console.error('Registration error', err);
    }
  });
}

}
