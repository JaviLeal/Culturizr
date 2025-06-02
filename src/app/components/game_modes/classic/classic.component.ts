import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { QuestionService, FormattedQuestion } from 'src/app/services/question.service';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.css']
})
export class ClassicComponent implements OnInit {
  
  preguntas: FormattedQuestion[] = [];
  preguntaActual = 0;
  respuestasUsuario: {
    seleccionada: string;
    correcta: boolean;
    respuestaCorrecta: string;
  }[] = [];

  juegoTerminado = false;

  categoryMap: { [key: number]: string } = {
    1: 'Historia',
    2: 'Ciencia',
    3: 'Arte',
    4: 'Geografía',
    5: 'Deportes',
    6: 'Tecnología',
    7: 'Literatura',
    8: 'Cine',
    9: 'Música',
    10: 'Cultura general'
  };

  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.questionService.getRandomQuestions().subscribe(preguntas => {
      this.preguntas = preguntas;
      this.preguntaActual = 0;
      this.respuestasUsuario = [];
      this.juegoTerminado = false;
    });
  }

  responder(opcion: { text: string; isCorrect: boolean }) {
    const pregunta = this.preguntas[this.preguntaActual];
    this.respuestasUsuario.push({
      seleccionada: opcion.text,
      correcta: opcion.isCorrect,
      respuestaCorrecta: pregunta.correctAnswer
    });

    this.preguntaActual++;

    if (this.preguntaActual >= this.preguntas.length) {
      this.juegoTerminado = true;
    }
  }

  reiniciarJuego() {
    this.cargarPreguntas();
  }

  volverHome() {
    this.router.navigate(['/home']);
  }
}
