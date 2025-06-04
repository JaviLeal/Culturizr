import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RankingEntry {
  username: string;
  email: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private apiUrl = 'http://localhost/culturizer-api';

  constructor(private http: HttpClient) {}

  getTopPlayers(): Observable<RankingEntry[]> {
    return this.http.get<RankingEntry[]>(`${this.apiUrl}/?route=top-scores`);
  }
}
