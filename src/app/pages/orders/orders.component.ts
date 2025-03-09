import { NgFor, NgClass, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

interface IOrder {
  orderID: number;
  productName: string;
  orderQuantity: number;
  customerEmail: string;
  total: number;
  orderDate: Date;
  status: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor, MatIcon, NgClass, DatePipe, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})

export class OrdersComponent implements OnInit {
  orders: IOrder[] = [
    {
      orderID: 1,
      productName: "Weekend Special Pizza",
      orderQuantity: 2,
      customerEmail: "john.doe@email.com",
      total: 25.98,
      orderDate: new Date('2024-01-15'),
      status: "Delivered"
    },
    {
      orderID: 2,
      productName: "Chicken Supreme Burger",
      orderQuantity: 1,
      customerEmail: "sarah.smith@email.com",
      total: 12.99,
      orderDate: new Date('2024-01-16'),
      status: "Processing"
    },
    {
      orderID: 3,
      productName: "Veggie Delight Salad",
      orderQuantity: 3,
      customerEmail: "mike.brown@email.com",
      total: 35.97,
      orderDate: new Date('2024-01-16'),
      status: "Pending"
    },
    {
      orderID: 4,
      productName: "Classic Fish & Chips",
      orderQuantity: 2,
      customerEmail: "emma.wilson@email.com",
      total: 31.98,
      orderDate: new Date('2024-01-17'),
      status: "Delivered"
    },
    {
      orderID: 5,
      productName: "Spicy Noodle Bowl",
      orderQuantity: 1,
      customerEmail: "alex.lee@email.com",
      total: 14.99,
      orderDate: new Date('2024-01-17'),
      status: "Processing"
    }
  ];

  // Pre-computed properties for order counts
  pendingOrdersCount = 0;
  processingOrdersCount = 0;
  deliveredOrdersCount = 0;
  searchTerm = '';

  ngOnInit() {
    this.updateCounts();
  }
  
  updateCounts() {
    this.pendingOrdersCount = this.orders.filter(o => o.status === 'Pending').length;
    this.processingOrdersCount = this.orders.filter(o => o.status === 'Processing').length;
    this.deliveredOrdersCount = this.orders.filter(o => o.status === 'Delivered').length;
  }
}
