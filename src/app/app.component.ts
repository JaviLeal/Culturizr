import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from './services/question.service';

@Component({
  selector: 'app-root',
  template: `
    <h2>Preguntas</h2>
    <ul *ngIf="questions">
      <li *ngFor="let q of questions">
        {{ q.question_text }}
      </li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((data) => {
      console.log('Preguntas recibidas:', data);  // Esto te ayudará a verificar que recibes todos los datos
      this.questions = data;
    });
  }
}
