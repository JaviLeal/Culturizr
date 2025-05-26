import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService, FormattedQuestion } from 'src/app/services/question.service';
import { Router } from '@angular/router';

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
  temporizador: any;

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
  }

  volverAJugar(): void {
    this.preguntaActual = 0;
    this.respuestasUsuario = [];
    this.juegoTerminado = false;
    this.tiempoRestante = 30;
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

  tiempoTotal: number = 30; 

getPorcentajeTiempo(): number {
  return (this.tiempoRestante / this.tiempoTotal) * 100;
}

getColorBarra(): string {
  const porcentaje = this.getPorcentajeTiempo();

  if (porcentaje > 50) return '#26a69a';       // verde
  else if (porcentaje > 25) return '#f9a825';  // naranja (ámbar)
  else return '#c62828';                        // rojo
}

}
