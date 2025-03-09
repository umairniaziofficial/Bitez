import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OrderServiceService, Order } from '../../services/order-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, HttpClientModule],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css',
  providers: [OrderServiceService]
})
export class ViewOrderComponent implements OnInit {
  order: Order | null = null;
  isLoading = true;
  error = '';

  constructor(
    private orderService: OrderServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    this.isLoading = true;
    this.error = '';

    const orderId = this.route.snapshot.paramMap.get('id');
    
    if (!orderId) {
      this.error = 'Order ID not provided';
      this.isLoading = false;
      return;
    }

    this.orderService.getOrder(orderId).subscribe({
      next: (data) => {
        this.order = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching order:', err);
        this.error = 'Failed to load order. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  calculateSubtotal(price: number, quantity: number): number {
    return price * quantity;
  }

  getStatusClass(status: string): string {
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

  editOrder(): void {
    if (this.order?._id) {
      this.router.navigate(['/dashboard/edit-order', this.order._id]);
    }
  }

  backToOrders(): void {
    this.router.navigate(['/dashboard/orders']);
  }

  printOrder(): void {
    window.print();
  }
}
