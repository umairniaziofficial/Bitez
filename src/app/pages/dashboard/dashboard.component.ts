import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProductServiceService, Product } from '../../services/product-service.service';
import { OrderServiceService, Order } from '../../services/order-service.service';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, DecimalPipe, HttpClientModule],
  templateUrl: './dashboard.component.html',
  providers: [ProductServiceService, OrderServiceService]
})
export class DashboardComponent implements OnInit {
  isAdmin = false;
  countdown = 3;
  products: Product[] = [];
  orders: Order[] = [];
  isLoading = true;
  error = '';
  
  
  totalEarnings = 0;
  pendingOrdersCount = 0;
  processingOrdersCount = 0;
  deliveredOrdersCount = 0;
  cancelledOrdersCount = 0;

  public demoData = [
    {
      title: "Products",
      total: 0,
      icon: "inventory_2",
      color: "blue"
    },
    {
      title: "Orders",
      total: 0,
      icon: "shopping_cart",
      color: "yellow"
    },
    {
      title: "Earnings",
      total: 0,
      icon: "payments",
      color: "green",
      isCurrency: true
    }
  ]

  
  recentOrders: Order[] = [];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private productService: ProductServiceService,
    private orderService: OrderServiceService
  ) { }

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
    } else {
      this.loadDashboardData();
    }
  }

  loadDashboardData() {
    this.isLoading = true;
    this.error = '';
    
    
    forkJoin({
      products: this.productService.getProducts(),
      orders: this.orderService.getOrders()
    }).subscribe({
      next: (results) => {
        this.products = results.products;
        this.orders = results.orders;
        
        
        this.processOrdersData();
        this.updateDashboardStats();
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
        this.error = 'Failed to load dashboard data. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  processOrdersData() {
    
    this.totalEarnings = this.orders
      .filter(order => order.status === 'Delivered')
      .reduce((sum, order) => sum + order.total, 0);
    
    
    this.pendingOrdersCount = this.orders.filter(o => o.status === 'Pending').length;
    this.processingOrdersCount = this.orders.filter(o => o.status === 'Processing').length;
    this.deliveredOrdersCount = this.orders.filter(o => o.status === 'Delivered').length;
    this.cancelledOrdersCount = this.orders.filter(o => o.status === 'Cancelled').length;
    
    
    this.recentOrders = [...this.orders]
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
      .slice(0, 5);
  }

  updateDashboardStats() {
    
    this.demoData[0].total = this.products.length;
    this.demoData[1].total = this.orders.length;
    this.demoData[2].total = this.totalEarnings;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onEditProduct(product: Product): void {
    if (product._id) {
      this.router.navigate(['/dashboard/edit-product', product._id]);
    }
  }

  onDeleteProduct(product: Product): void {
    if (!product._id) return;
    
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      this.productService.deleteProduct(product._id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p._id !== product._id);
          
          this.updateDashboardStats();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product. Please try again later.');
        }
      });
    }
  }

  viewOrder(order: Order) {
    
    if (order._id) {
      this.router.navigate(['/dashboard/view-order', order._id]);
    }
  }

  
  getStatusColorClass(status: string): string {
    switch (status) {
      case 'Pending': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  
  getStatusIcon(status: string): string {
    switch (status) {
      case 'Pending': return 'pending';
      case 'Processing': return 'sync';
      case 'Delivered': return 'check_circle';
      case 'Cancelled': return 'cancel';
      default: return 'help';
    }
  }

  
  getFormattedDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  
  navigateToAddProduct() {
    this.router.navigate(['/dashboard/add-product']);
  }

  
  navigateToAddOrder() {
    this.router.navigate(['/dashboard/add-order']);
  }

  
  navigateToProducts() {
    this.router.navigate(['/dashboard/products']);
  }

  
  navigateToOrders() {
    this.router.navigate(['/dashboard/orders']);
  }
}