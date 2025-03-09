import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  OrderServiceService,
  Order,
  OrderProduct,
} from '../../services/order-service.service';
import {
  ProductServiceService,
  Product,
} from '../../services/product-service.service';

@Component({
  selector: 'app-add-orders',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-orders.component.html',
  styleUrl: './add-orders.component.css',
  providers: [OrderServiceService, ProductServiceService],
})
export class AddOrdersComponent implements OnInit {
  order: {
    customerEmail: string;
    customerName?: string;
    customerPhone?: string;
    products: {
      product: Product | null;
      quantity: number;
    }[];
    status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
  } = {
    customerEmail: '',
    customerName: '',
    customerPhone: '',
    products: [{ product: null, quantity: 1 }],
    status: 'Pending',
  };

  availableProducts: Product[] = [];
  isSubmitting = false;
  error = '';
  success = '';
  isLoading = true;

  constructor(
    private orderService: OrderServiceService,
    private productService: ProductServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.availableProducts = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  addProductToOrder(): void {
    this.order.products.push({ product: null, quantity: 1 });
  }

  removeProductFromOrder(index: number): void {
    if (this.order.products.length > 1) {
      this.order.products.splice(index, 1);
    }
  }

  calculateTotal(): number {
    return this.order.products.reduce((total, item) => {
      if (item.product) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  }

  onSubmit(form: NgForm): void {
    if (this.isSubmitting || !form.valid) return;

    if (!this.order.products.some((item) => item.product !== null)) {
      this.error = 'Please select at least one product';
      return;
    }

    this.isSubmitting = true;
    this.error = '';
    this.success = '';

    const orderProducts: OrderProduct[] = this.order.products
      .filter((item) => item.product !== null)
      .map((item) => ({
        productId: item.product!._id as string,
        name: item.product!.name,
        price: item.product!.price,
        quantity: item.quantity,
      }));

    const newOrder: Omit<Order, '_id'> = {
      customerEmail: this.order.customerEmail,
      customerName: this.order.customerName,
      customerPhone: this.order.customerPhone,
      products: orderProducts,
      total: this.calculateTotal(),
      status: this.order.status,
      orderDate: new Date(),
    };

    this.orderService.createOrder(newOrder).subscribe({
      next: (response) => {
        this.success = 'Order created successfully!';
        this.isSubmitting = false;

        this.order = {
          customerEmail: '',
          customerName: '',
          customerPhone: '',
          products: [{ product: null, quantity: 1 }],
          status: 'Pending',
        };
        form.resetForm();
      },
      error: (error) => {
        this.error =
          error.message || 'Failed to create order. Please try again.';
        this.isSubmitting = false;
        console.error('Error creating order:', error);
      },
    });
  }
}
