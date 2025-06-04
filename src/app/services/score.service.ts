import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private apiUrl = 'http://localhost/culturizer-api/?route=update-score';

  constructor(private http: HttpClient) {}

  updateScore(userId: number, puntos: number): Observable<any> {
    const payload = { user_id: userId, puntos };
    return this.http.post(this.apiUrl, payload);
  }
}
