import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

   constructor(private router: Router) {}

  confirmLogout(event: Event) {
    event.preventDefault(); // evita navegación automática

    const confirmed = confirm('¿Seguro que quieres cerrar sesión?');
    if (confirmed) {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
}

