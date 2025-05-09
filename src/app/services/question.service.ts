import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  id: number;
  category_id: number;
  question_text: string;
  correct_answer: string;
  wrong_answer_1: string;
  wrong_answer_2: string;
  wrong_answer_3: string;
  difficulty: 'fácil' | 'media' | 'difícil';
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost/culturizer-api/?route=questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
