import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  showHeaderFooter = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const isAuthPage = event.url === '/'; // ruta AuthComponent

        this.showHeaderFooter = !isAuthPage;

        // Añadir o quitar la clase que bloquea el scroll
        if (isAuthPage) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
        }
      }
    });
  }
}
