import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost/culturizer-api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/?route=login`, { email, password }).pipe(
      tap((response) => {
        if (response && response.id) {
          localStorage.setItem('userId', response.id);
          localStorage.setItem('username', response.username);
        } else if (response && response.user && response.user.id) {
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('username', response.user.username);
        }
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/?route=register`, { username, email, password }).pipe(
      tap((response) => {
        if (response && response.id) {
          localStorage.setItem('userId', response.id);
          localStorage.setItem('username', response.username);
        } else if (response && response.user && response.user.id) {
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('username', response.user.username);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }
}
