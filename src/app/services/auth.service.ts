import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private emailKey = 'userEmail';
  private logoutTimer: any;
  private roleChange = new Subject<string | null>();

  roleChanged$ = this.roleChange.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) { }

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
        .post<{ token: string, role: string }>('http://localhost:3000/login', {
          email,
          password,
        })
        .subscribe({
          next: (response) => {
            localStorage.setItem(this.tokenKey, response.token);
            localStorage.setItem(this.roleKey, response.role || 'user');
            localStorage.setItem(this.emailKey, email);

            // Show login success notification
            this.notificationService.show(
              `Successfully logged in as ${response.role || 'user'}`,
              'success'
            );

            this.roleChange.next(response.role || 'user');

            // Redirect based on role
            if (response.role === 'admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/']);
            }

            subscriber.next(response);
            subscriber.complete();
          },
          error: (error) => {
            console.error(error);
            this.notificationService.show(
              error.error?.error || 'Login failed',
              'error'
            );
            subscriber.error(error);
          },
        });
    });
  }

  logout(message?: string) {
    if (message) {
      this.notificationService.show(message, 'info');
    }

    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.emailKey);
    this.roleChange.next(null);

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  isAdmin(): boolean {
    const role = localStorage.getItem(this.roleKey);
    return role === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }
}

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  if (!authService.isAdmin()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
