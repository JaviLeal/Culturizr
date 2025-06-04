import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core'; 
import { QuestionService, FormattedQuestion } from 'src/app/services/question.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

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

  totalScore: number = 0;
  guardandoPuntuacion: boolean = false;
  puntuacionGuardada: boolean = false;

  constructor(
    private questionService: QuestionService,
    private renderer: Renderer2,
    private http: HttpClient,
    private authService: AuthService
  ) {}

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
        this.totalScore = 0;
        this.guardandoPuntuacion = false;
        this.puntuacionGuardada = false;
      },
      error => console.error('Error cargando preguntas difíciles:', error)
    );
  }

  responder(opcion: { text: string; isCorrect: boolean }) {
    const pregunta = this.preguntas[this.preguntaActualIndex];

    if (opcion.isCorrect) {
      this.totalScore += 2000; // Todas las preguntas son difíciles
    }

    this.respuestasUsuario.push({
      seleccionada: opcion.text,
      correcta: opcion.isCorrect,
      respuestaCorrecta: pregunta.correctAnswer
    });

    if (this.preguntaActualIndex < this.preguntas.length - 1) {
      this.preguntaActualIndex++;
    } else {
      this.juegoTerminado = true;
      this.guardarPuntuacion();
    }
  }

  guardarPuntuacion() {
    this.guardandoPuntuacion = true;
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('No hay userId disponible');
      this.guardandoPuntuacion = false;
      return;
    }

    const body = {
      user_id: userId,
      puntos: this.totalScore
    };

    this.http.post('http://localhost/culturizer-api/?route=update-score', body)
      .subscribe({
        next: () => {
          this.guardandoPuntuacion = false;
          this.puntuacionGuardada = true;
        },
        error: (err) => {
          console.error('Error al guardar puntuación:', err);
          this.guardandoPuntuacion = false;
        }
      });
  }

  reiniciar() {
    this.cargarPreguntasDificiles();
  }
}
