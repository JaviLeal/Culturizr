import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doubt {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoubtService {
  private apiUrl = 'http://localhost/culturizer-api/?route=submit-doubt';

  constructor(private http: HttpClient) {}

  submitDoubt(doubt: Doubt): Observable<any> {
    return this.http.post(this.apiUrl, doubt);
  }
}
