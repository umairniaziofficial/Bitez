import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
interface NavigationItem {
  label: string;
  icon: string;
  route: string;
  exact?: boolean;
}
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit, OnDestroy {
  userName = '';
  userRole = '';
  userEmail = '';
  userInitials = '';
  notificationCount = 3;
  private roleSubscription: Subscription | null = null;
  navigationItems: NavigationItem[] = [
    { label: 'Dashboard', icon: 'inventory_2', route: '/dashboard', exact: true },
    { label: 'Add Product', icon: 'add_box', route: '/dashboard/add-product' },
    { label: 'Orders', icon: 'shopping_cart', route: '/dashboard/orders' },
  ];
  showMobileMenu = false;
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.loadUserData();
    this.roleSubscription = this.authService.roleChanged$.subscribe(() => {
      this.loadUserData();
    });
  }
  ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }
  loadUserData(): void {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.userEmail = userEmail;
      this.userName = this.formatUserName(userEmail);
      this.userInitials = this.getInitials(userEmail);
    } else {
      this.userName = 'Guest User';
      this.userInitials = 'GU';
    }
    this.userRole = this.authService.getUserRole() || 'User';
  }
  formatUserName(email: string): string {
    const namePart = email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  }
  getInitials(email: string): string {
    if (!email) return 'GU';
    const namePart = email.split('@')[0];
    if (namePart.includes('.')) {
      return namePart
        .split('.')
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
    } else {
      return namePart.slice(0, 2).toUpperCase();
    }
  }
  logout(): void {
    this.authService.logout('Successfully logged out');
  }
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Close mobile menu when clicking outside
    const clickedElement = event.target as HTMLElement;
    if (this.showMobileMenu && !clickedElement.closest('.mobile-menu') && 
        !clickedElement.classList.contains('more-button')) {
      this.showMobileMenu = false;
    }
  }
}
