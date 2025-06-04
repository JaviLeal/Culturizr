import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { QuestionService, FormattedQuestion } from 'src/app/services/question.service';
import { AuthService } from 'src/app/services/auth.service';
import { ScoreService } from 'src/app/services/score.service';

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
  totalScore: number = 0;

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

  constructor(
    private questionService: QuestionService, 
    private router: Router,
    private authService: AuthService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.questionService.getRandomQuestions().subscribe(preguntas => {
      this.preguntas = preguntas;
      this.preguntaActual = 0;
      this.respuestasUsuario = [];
      this.juegoTerminado = false;
      this.totalScore = 0;
    });
  }

  responder(opcion: { text: string; isCorrect: boolean }) {
    const pregunta = this.preguntas[this.preguntaActual];

    if (opcion.isCorrect) {
      let puntos = 0;
      if (pregunta.difficulty === 'fácil') puntos = 500;
      else if (pregunta.difficulty === 'media') puntos = 1000;
      else if (pregunta.difficulty === 'difícil') puntos = 2000;
      this.totalScore += puntos;
    }

    this.respuestasUsuario.push({
      seleccionada: opcion.text,
      correcta: opcion.isCorrect,
      respuestaCorrecta: pregunta.correctAnswer
    });

    this.preguntaActual++;

    if (this.preguntaActual >= this.preguntas.length) {
      this.finalizarJuego();
    }
  }

  finalizarJuego() {
    this.juegoTerminado = true;

    const userId = this.authService.getUserId();
    if (userId) {
      this.scoreService.updateScore(userId, this.totalScore).subscribe({
        next: () => console.log('Puntuación guardada con éxito'),
        error: err => console.error('Error al guardar puntuación', err)
      });
    }
  }

  reiniciarJuego() {
    this.cargarPreguntas();
  }

  volverHome() {
    this.router.navigate(['/home']);
  }
}
