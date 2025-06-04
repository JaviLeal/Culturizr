import { Component } from '@angular/core';
import { QuestionService, FormattedQuestion } from 'src/app/services/question.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-one-theme',
  templateUrl: './one-theme.component.html',
  styleUrls: ['./one-theme.component.css']
})
export class OneThemeComponent {
  categorias = [
    { nombre: 'Deporte', color: '#FF6384', id: 1 },
    { nombre: 'Ciencia', color: '#36A2EB', id: 2 },
    { nombre: 'Historia', color: '#FFCE56', id: 3 }
  ];

  tiradaConfirmada = false;
  angulo = 0;
  girando = false;
  categoriaSeleccionada: string | null = null;

  preguntasFiltradas: FormattedQuestion[] = [];
  preguntaActualIndex = 0;
  juegoTerminado = false;
  respuestasUsuario: { seleccionada: string; correcta: boolean; respuestaCorrecta: string }[] = [];

  totalScore: number = 0;
  guardandoPuntuacion: boolean = false;
  puntuacionGuardada: boolean = false;

  constructor(
    private questionService: QuestionService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  girarRuleta() {
    if (this.girando) return;

    this.girando = true;
    const vueltas = 5;
    const anguloFinal = Math.floor(Math.random() * 360);
    const anguloTotal = 360 * vueltas + anguloFinal;

    this.angulo += anguloTotal;

    setTimeout(() => {
      const anguloEn360 = this.angulo % 360;
      const seccionIndex = Math.floor(((360 - anguloEn360) % 360) / 120);
      this.categoriaSeleccionada = this.categorias[seccionIndex].nombre;
      this.girando = false;
    }, 4000);
  }

  jugar() {
    if (!this.categoriaSeleccionada) return;

    const categoriaObj = this.categorias.find(c => c.nombre === this.categoriaSeleccionada);
    if (!categoriaObj) return;

    this.tiradaConfirmada = true; // bloquea la tirada

    this.questionService.getQuestionsByCategory(categoriaObj.id).subscribe(
      preguntas => {
        this.preguntasFiltradas = preguntas
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);
        this.preguntaActualIndex = 0;
        this.juegoTerminado = false;
        this.respuestasUsuario = [];
        this.totalScore = 0;            // Resetea puntuación al iniciar
        this.puntuacionGuardada = false;
        this.guardandoPuntuacion = false;
      },
      error => console.error('Error cargando preguntas:', error)
    );
  }

  responder(opcion: { text: string; isCorrect: boolean }) {
    if (this.juegoTerminado) return;

    const preguntaActual = this.preguntasFiltradas[this.preguntaActualIndex];

    if (opcion.isCorrect) {
      let puntos = 0;
      if (preguntaActual.difficulty === 'fácil') puntos = 500;
      else if (preguntaActual.difficulty === 'media') puntos = 1000;
      else if (preguntaActual.difficulty === 'difícil') puntos = 2000;
      this.totalScore += puntos;
    }

    this.respuestasUsuario.push({
      seleccionada: opcion.text,
      correcta: opcion.isCorrect,
      respuestaCorrecta: preguntaActual.correctAnswer
    });

    if (this.preguntaActualIndex + 1 < this.preguntasFiltradas.length) {
      this.preguntaActualIndex++;
    } else {
      this.juegoTerminado = true;
      this.guardarPuntuacion(); // Guarda la puntuación cuando termina
    }
  }

  guardarPuntuacion(): void {
    this.guardandoPuntuacion = true;
    this.puntuacionGuardada = false;

    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('No hay userId, no se puede guardar puntuación');
      this.guardandoPuntuacion = false;
      return;
    }

    const body = {
      user_id: userId,
      puntos: this.totalScore
    };

    this.http.post('http://localhost/culturizer-api/?route=update-score', body)
      .subscribe({
        next: (response) => {
          console.log('Puntuación guardada con éxito:', response);
          this.guardandoPuntuacion = false;
          this.puntuacionGuardada = true;
        },
        error: (err) => {
          console.error('Error al guardar puntuación:', err);
          this.guardandoPuntuacion = false;
        }
      });
  }

  reiniciarJuego() {
    this.categoriaSeleccionada = null;
    this.preguntasFiltradas = [];
    this.preguntaActualIndex = 0;
    this.juegoTerminado = false;
    this.respuestasUsuario = [];
    this.tiradaConfirmada = false;

    this.totalScore = 0;
    this.puntuacionGuardada = false;
    this.guardandoPuntuacion = false;
  }
}
