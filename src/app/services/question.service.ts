import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface FormattedQuestion {
  id: number;
  categoryId: number;
  text: string;
  correctAnswer: string;
  difficulty: string;
  options: { text: string; isCorrect: boolean }[];
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost/culturizer-api/?route=questions';

  constructor(private http: HttpClient) { }

  getRandomQuestions(): Observable<FormattedQuestion[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data =>
        data
          .sort(() => Math.random() - 0.5)
          .slice(0, 10)
          .map(q => ({
            id: q.id,
            categoryId: q.category_id,
            text: q.question_text,
            correctAnswer: q.correct_answer,
            difficulty: q.difficulty,
            options: shuffle([
              { text: q.correct_answer, isCorrect: true },
              { text: q.wrong_answer_1, isCorrect: false },
              { text: q.wrong_answer_2, isCorrect: false },
              { text: q.wrong_answer_3, isCorrect: false }
            ])
          }))
      )
    );
  }
  getAllQuestions(): Observable<FormattedQuestion[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data =>
        data.map(q => ({
          id: q.id,
          categoryId: q.category_id,
          text: q.question_text,
          correctAnswer: q.correct_answer,
          difficulty: q.difficulty,
          options: shuffle([
            { text: q.correct_answer, isCorrect: true },
            { text: q.wrong_answer_1, isCorrect: false },
            { text: q.wrong_answer_2, isCorrect: false },
            { text: q.wrong_answer_3, isCorrect: false }
          ])
        }))
      )
    );
  }
  
getQuestionsByCategory(categoryId: number): Observable<FormattedQuestion[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map(data =>
      data
        .filter(q => q.category_id === categoryId)
        .map(q => ({
          id: q.id,
          categoryId: q.category_id,
          text: q.question_text,
          correctAnswer: q.correct_answer,
          difficulty: q.difficulty,
          options: shuffle([
            { text: q.correct_answer, isCorrect: true },
            { text: q.wrong_answer_1, isCorrect: false },
            { text: q.wrong_answer_2, isCorrect: false },
            { text: q.wrong_answer_3, isCorrect: false }
          ])
        }))
    )
  );
}

}

function shuffle(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5);
}
