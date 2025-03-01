import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private tokenKey = 'authToken';
  constructor(private http: HttpClient, private router: Router) {}
  
  register(email: string, password: string) {
    return this.http.post('http://localhost:3000/register', {
      email,
      password,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>('http://localhost:3000/login', {
        email,
        password,
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem(this.tokenKey, response.token);
          this.router.navigate(['/dashbaord']);
        },
        error: (error) => {
          console.error(error);
        },
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
