import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { QuestionService, FormattedQuestion } from 'src/app/services/question.service';

@Component({
  selector: 'app-extreme',
  templateUrl: './extreme.component.html',
  styleUrls: ['./extreme.component.css']
})
export class ExtremeComponent implements OnInit, OnDestroy {
  
  preguntas: FormattedQuestion[] = [];
  preguntaActualIndex = 0;
  respuestasUsuario: {
    seleccionada: string;
    correcta: boolean;
    respuestaCorrecta: string;
  }[] = [];
  juegoTerminado = false;

  constructor(private questionService: QuestionService, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'dark-mode');
    this.cargarPreguntasDificiles();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'dark-mode');
  }

  cargarPreguntasDificiles() {
    this.questionService.getHardQuestions().subscribe(
      preguntas => {
        this.preguntas = preguntas;
        this.preguntaActualIndex = 0;
        this.juegoTerminado = false;
        this.respuestasUsuario = [];
      },
      error => console.error('Error cargando preguntas difíciles:', error)
    );
  }

  responder(opcion: { text: string; isCorrect: boolean }) {
    const pregunta = this.preguntas[this.preguntaActualIndex];

    this.respuestasUsuario.push({
      seleccionada: opcion.text,
      correcta: opcion.isCorrect,
      respuestaCorrecta: pregunta.correctAnswer
    });

    if (this.preguntaActualIndex < this.preguntas.length - 1) {
      this.preguntaActualIndex++;
    } else {
      this.juegoTerminado = true;
    }
  }

  reiniciar() {
    this.cargarPreguntasDificiles();
  }
}
