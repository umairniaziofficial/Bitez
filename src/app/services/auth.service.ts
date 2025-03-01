import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';
  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/register', {
      email,
      password,
    }).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => error.error?.message || 'Registration failed');
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return new Observable((subscriber) => {
      this.http
        .post<{ token: string }>('http://localhost:3000/login', {
          email,
          password,
        })
        .subscribe({
          next: (response) => {
            localStorage.setItem(this.tokenKey, response.token);
            this.router.navigate(['/dashbaord']);
            subscriber.next(response);
            subscriber.complete();
          },
          error: (error) => {
            console.error(error);
            subscriber.error(error);
          },
        });
    });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
