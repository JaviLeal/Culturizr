import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div class="auth-container">
      <button (click)="showLogin = true">Iniciar sesión</button>
      <button (click)="showLogin = false">Registrarse</button>
      <app-login *ngIf="showLogin"></app-login>
      <app-register *ngIf="!showLogin"></app-register>
    </div>
  `
})
export class AuthComponent {
  showLogin = true;
}
