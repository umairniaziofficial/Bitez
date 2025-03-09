import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderServiceService, Order } from '../../services/order-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, HttpClientModule],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css',
  providers: [OrderServiceService]
})
export class OrderSuccessComponent implements OnInit {
  orderId: string | null = null;
  order: Order | null = null;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderServiceService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.loadOrderDetails();
    } else {
      this.isLoading = false;
    }
  }

  loadOrderDetails(): void {
    if (!this.orderId) return;

    this.orderService.getOrder(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading order details:', err);
        this.error = 'Could not load order details';
        this.isLoading = false;
      }
    });
  }
}
