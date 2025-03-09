import { NgFor, NgClass, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {
  OrderServiceService,
  Order,
} from '../../services/order-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NgFor,
    MatIcon,
    NgClass,
    DatePipe,
    FormsModule,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  providers: [OrderServiceService],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  isLoading = true;
  error = '';
  searchTerm = '';

  pendingOrdersCount = 0;
  processingOrdersCount = 0;
  deliveredOrdersCount = 0;

  constructor(
    private orderService: OrderServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.error = '';

    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = [...data];
        this.updateCounts();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.error = 'Failed to load orders. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  updateCounts() {
    this.pendingOrdersCount = this.orders.filter(
      (o) => o.status === 'Pending'
    ).length;
    this.processingOrdersCount = this.orders.filter(
      (o) => o.status === 'Processing'
    ).length;
    this.deliveredOrdersCount = this.orders.filter(
      (o) => o.status === 'Delivered'
    ).length;
  }

  searchOrders() {
    if (!this.searchTerm.trim()) {
      this.filteredOrders = [...this.orders];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredOrders = this.orders.filter(
      (order) =>
        order.customerEmail.toLowerCase().includes(term) ||
        order._id?.toLowerCase().includes(term) ||
        order.products.some((p) => p.name.toLowerCase().includes(term))
    );
  }

  filterByStatus(status: string) {
    if (!status) {
      this.filteredOrders = [...this.orders];
      return;
    }

    this.filteredOrders = this.orders.filter(
      (order) => order.status === status
    );
  }

  getTotalItems(order: Order): number {
    if (!order.products || !Array.isArray(order.products)) {
      return 0;
    }

    return order.products.reduce(
      (sum, product) => sum + (product.quantity || 0),
      0
    );
  }

  viewOrder(order: Order) {
    if (order._id) {
      this.router.navigate(['/dashboard/view-order', order._id]);
    }
  }

  editOrder(order: Order) {
    if (order._id) {
      this.router.navigate(['/dashboard/edit-order', order._id]);
    }
  }

  deleteOrder(order: Order) {
    if (!order._id) return;

    if (confirm(`Are you sure you want to delete order #${order._id}?`)) {
      this.orderService.deleteOrder(order._id).subscribe({
        next: () => {
          this.orders = this.orders.filter((o) => o._id !== order._id);
          this.filteredOrders = this.filteredOrders.filter(
            (o) => o._id !== order._id
          );
          this.updateCounts();
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          alert('Failed to delete order. Please try again later.');
        },
      });
    }
  }
}
