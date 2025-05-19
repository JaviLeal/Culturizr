import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  ngAfterViewInit() {
    const btn = document.getElementById('toggle-dark-mode');
    if (btn) {
      btn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        btn.textContent = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
      });
    }
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    const btn = document.getElementById('toggle-dark-mode');
    if (btn) {
      btn.textContent = savedTheme === 'dark' ? '☀️ Modo claro' : '🌙 Modo oscuro';
    }
  }

  confirmLogout(event: Event) {
    event.preventDefault(); // evita navegación automática

    const confirmed = confirm('¿Seguro que quieres cerrar sesión?');
    if (confirmed) {
      this.logout();
      console.log("Sesión cerrada");
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

