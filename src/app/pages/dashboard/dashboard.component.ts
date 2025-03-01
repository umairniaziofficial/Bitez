import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  isAdmin = false;
  countdown = 3;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    if (!this.isAdmin) {
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(timer);
          this.authService.logout('You need admin privileges to access the dashboard.');
        }
      }, 1000);
    }
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}