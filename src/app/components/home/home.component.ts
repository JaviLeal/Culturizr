import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

   selectMode(mode: string) {
    console.log('Modo seleccionado:', mode);
    // Aquí luego pondré la navegación a la ruta correspondiente
    // this.router.navigate([`/mode/${mode}`]);
   }
}
