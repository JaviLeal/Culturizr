import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService, FormattedQuestion } from 'src/app/services/question.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.css']
})
export class ChronometerComponent implements OnInit, OnDestroy {
  preguntas: FormattedQuestion[] = [];
  preguntaActual = 0;
  respuestasUsuario: {
    seleccionada: string;
    correcta: boolean;
    respuestaCorrecta: string;
  }[] = [];

  juegoTerminado = false;
  tiempoRestante = 30;
  tiempoTotal: number = 30;
  totalScore: number = 0;
  temporizador: any;

  guardandoPuntuacion: boolean = false;
  puntuacionGuardada: boolean = false;

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
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe(preguntas => {
      this.preguntas = this.shuffle(preguntas);
      this.iniciarTemporizador();
    });
  }

  iniciarTemporizador(): void {
    this.temporizador = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante === 0) {
        this.finalizarJuego();
      }
    }, 1000);
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

  finalizarJuego(): void {
    clearInterval(this.temporizador);
    this.juegoTerminado = true;
    this.guardandoPuntuacion = false; // Reiniciamos para mostrar "Guardando..."
    this.guardarPuntuacion();
  }

  guardarPuntuacion(): void {
    this.guardandoPuntuacion = true;
    this.puntuacionGuardada = false; // Reiniciar

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
      .pipe(timeout(5000))
      .subscribe({
        next: (response) => {
          console.log('Puntuación guardada con éxito:', response);
          this.guardandoPuntuacion = false;
          this.puntuacionGuardada = true;  // <-- Aquí la marcas como guardada
        },
        error: (err) => {
          console.error('Error al guardar puntuación o timeout:', err);
          this.guardandoPuntuacion = false;
          this.puntuacionGuardada = false;
        },
        complete: () => {
          console.log('Petición completada');
          // Ya está manejado arriba, no hace falta cambiar aquí
        }
      });
  }


  volverAJugar(): void {
    this.preguntaActual = 0;
    this.respuestasUsuario = [];
    this.juegoTerminado = false;
    this.tiempoRestante = 30;
    this.totalScore = 0;
    this.puntuacionGuardada = false; // <-- Reiniciar aquí también
    this.ngOnInit();
  }


  irAHome(): void {
    this.router.navigate(['/home']);
  }

  get respuestasCorrectas(): number {
    return this.respuestasUsuario.filter(r => r.correcta).length;
  }

  ngOnDestroy(): void {
    clearInterval(this.temporizador);
  }

  private shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  getPorcentajeTiempo(): number {
    return (this.tiempoRestante / this.tiempoTotal) * 100;
  }

  getColorBarra(): string {
    const porcentaje = this.getPorcentajeTiempo();

    if (porcentaje > 50) return '#26a69a';
    else if (porcentaje > 25) return '#f9a825';
    else return '#c62828';
  }
}
