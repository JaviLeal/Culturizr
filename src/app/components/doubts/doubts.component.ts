import { Component } from '@angular/core';

@Component({
  selector: 'app-doubts',
  templateUrl: './doubts.component.html',
  styleUrls: ['./doubts.component.css']
})
export class DoubtsComponent {

 nombre = '';
  email = '';
  mensaje = '';

  enviarDuda() {
    console.log('Duda enviada:', { nombre: this.nombre, email: this.email, mensaje: this.mensaje });
    alert('Tu mensaje se ha enviado correctamente. ¡Muchas gracias!');
    
    // Limpiar campos
    this.nombre = '';
    this.email = '';
    this.mensaje = '';
  }
}
