import { Component } from '@angular/core';
import { QuestionService, FormattedQuestion } from 'src/app/services/question.service';

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

  constructor(private questionService: QuestionService) {}

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
        .sort(() => Math.random() - 0.5) // Mezcla aleatoriamente si lo deseas
        .slice(0, 10); // Limita a 10 preguntas
      this.preguntaActualIndex = 0;
      this.juegoTerminado = false;
      this.respuestasUsuario = [];
    },
    error => console.error('Error cargando preguntas:', error)
  );
}


  responder(opcion: { text: string; isCorrect: boolean }) {
    if (this.juegoTerminado) return;

    const preguntaActual = this.preguntasFiltradas[this.preguntaActualIndex];

    this.respuestasUsuario.push({
      seleccionada: opcion.text,
      correcta: opcion.isCorrect,
      respuestaCorrecta: preguntaActual.correctAnswer
    });

    if (this.preguntaActualIndex + 1 < this.preguntasFiltradas.length) {
      this.preguntaActualIndex++;
    } else {
      this.juegoTerminado = true;
    }
  }

  reiniciarJuego() {
    this.categoriaSeleccionada = null;
    this.preguntasFiltradas = [];
    this.preguntaActualIndex = 0;
    this.juegoTerminado = false;
    this.respuestasUsuario = [];
    this.tiradaConfirmada = false; // habilita de nuevo la tirada
  }
}
