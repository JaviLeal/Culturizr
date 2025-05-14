import { Component } from '@angular/core';
import { DoubtService, Doubt } from 'src/app/services/doubt.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-doubts',
  templateUrl: './doubts.component.html',
  styleUrls: ['./doubts.component.css']
})
export class DoubtsComponent {

 doubt: Doubt = {
    name: '',
    email: '',
    message: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private doubtService: DoubtService) {}

  submitDoubt(form: NgForm) {
  this.doubtService.submitDoubt(this.doubt).subscribe({
    next: (res) => {
      this.successMessage = 'Duda enviada con éxito.';
      this.errorMessage = '';
      form.resetForm();  
    },
    error: (err) => {
      this.errorMessage = 'Error al enviar la duda.';
      this.successMessage = '';
    }
  });
}

}
