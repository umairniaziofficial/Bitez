import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, DecimalPipe],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  isAdmin = false;
  countdown = 3;
  products: Product[] = [];

  public demoData = [
    {
      title: "Products",
      total: 10,
      icon: "inventory_2",
    },
    {
      title: "Orders",
      total: 5,
      icon: "shopping_cart",
    },
    {
      title: "Earnings",
      total: 1000,
      icon: "payments",
    },
  ]

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

    // Initialize mock products
    this.products = [
      {
        id: 1,
        name: "Classic Burger",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 2,
        name: "Veggie Pizza",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 3,
        name: "Chicken Salad",
        price: 8.50,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 4,
        name: "Chocolate Cake",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      }
    ];
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onEditProduct(product: Product): void {
    // Placeholder for edit functionality
    console.log('Editing product:', product);
    // This would typically open a modal or navigate to an edit page
  }

  onDeleteProduct(product: Product): void {
    // Placeholder for delete functionality
    console.log('Deleting product:', product);
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      this.products = this.products.filter(p => p.id !== product.id);
    }
  }
}