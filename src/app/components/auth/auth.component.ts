import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 

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

  constructor(private authService: AuthService) {} // Inyectamos el servicio en el constructor

  login() {
    if (this.email && this.password) {
      this.authService.login( this.email, this.password).subscribe(
        (response) => {
          // Aquí manejamos la respuesta del backend, por ejemplo, el login exitoso
          this.successMessage = 'Inicio de sesión exitoso';
          this.errorMessage = ''; // Limpiamos el mensaje de error
        },
        (error) => {
          // Si hay un error en el login, mostramos el mensaje de error
          this.errorMessage = 'Error al iniciar sesión: ' + error.message;
          this.successMessage = ''; // Limpiamos el mensaje de éxito
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingrese correo y contraseña';
      this.successMessage = ''; // Limpiamos cualquier mensaje de éxito
    }
  }

  register() {
    if (this.username && this.email && this.password) {
      this.authService.register(this.username, this.email, this.password).subscribe(
        (response) => {
          // Aquí manejamos la respuesta del backend, por ejemplo, registro exitoso
          this.successMessage = 'Registro exitoso';
          this.errorMessage = ''; // Limpiamos el mensaje de error
        },
        (error) => {
          // Si hay un error en el registro, mostramos el mensaje de error
          this.errorMessage = 'Error al registrar usuario: ' + error.message;
          this.successMessage = ''; // Limpiamos el mensaje de éxito
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingrese usuario, correo y contraseña';
      this.successMessage = ''; // Limpiamos cualquier mensaje de éxito
    }
  }
}
