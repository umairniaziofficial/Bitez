import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  OrderServiceService,
  Order,
  OrderProduct,
} from '../../services/order-service.service';
import {
  ProductServiceService,
  Product,
} from '../../services/product-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, HttpClientModule],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css',
  providers: [OrderServiceService, ProductServiceService],
})
export class EditOrderComponent implements OnInit {
  orderId: string | null = null;
  originalOrder: Order | null = null;

  order = {
    customerEmail: '',
    customerName: '',
    customerPhone: '',
    products: [] as {
      productId: string;
      product: Product | null;
      name: string;
      price: number;
      quantity: number;
    }[],
    status: '' as 'Pending' | 'Processing' | 'Delivered' | 'Cancelled',
  };

  availableProducts: Product[] = [];
  isLoading = true;
  isSubmitting = false;
  error = '';
  success = '';

  constructor(
    private orderService: OrderServiceService,
    private productService: ProductServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.loadOrderAndProducts();
    } else {
      this.error = 'No order ID provided';
      this.isLoading = false;
    }
  }

  loadOrderAndProducts(): void {
    this.isLoading = true;
    this.error = '';

    if (!this.orderId) return;

    forkJoin({
      order: this.orderService.getOrder(this.orderId),
      products: this.productService.getProducts(),
    }).subscribe({
      next: ({ order, products }) => {
        this.originalOrder = order;
        this.availableProducts = products;

        this.order.customerEmail = order.customerEmail;
        this.order.customerName = order.customerName || '';
        this.order.customerPhone = order.customerPhone || '';
        this.order.status = order.status;
        this.order.products = order.products.map((item) => {
          const matchingProduct = products.find(
            (p) => p._id === item.productId
          );
          return {
            productId: item.productId,
            product: matchingProduct || null,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          };
        });

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading order data:', err);
        this.error = 'Failed to load order. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  addProductToOrder(): void {
    this.order.products.push({
      productId: '',
      product: null,
      name: '',
      price: 0,
      quantity: 1,
    });
  }

  removeProductFromOrder(index: number): void {
    if (this.order.products.length > 1) {
      this.order.products.splice(index, 1);
    }
  }

  onProductSelected(index: number, product: Product): void {
    const item = this.order.products[index];
    item.productId = product._id || '';
    item.name = product.name;
    item.price = product.price;
  }

  calculateTotal(): number {
    return this.order.products.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  onSubmit(form: NgForm): void {
    if (this.isSubmitting || !form.valid || !this.orderId) return;

    if (this.order.products.length === 0) {
      this.error = 'Please add at least one product to the order';
      return;
    }

    this.isSubmitting = true;
    this.error = '';
    this.success = '';

    const orderProducts: OrderProduct[] = this.order.products.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const updatedOrder: Partial<Order> = {
      customerEmail: this.order.customerEmail,
      customerName: this.order.customerName,
      customerPhone: this.order.customerPhone,
      products: orderProducts,
      total: this.calculateTotal(),
      status: this.order.status,
    };

    this.orderService.updateOrder(this.orderId, updatedOrder).subscribe({
      next: (response) => {
        this.success = 'Order updated successfully!';
        this.isSubmitting = false;
        setTimeout(() => {
          this.router.navigate(['/dashboard/orders']);
        }, 1500);
      },
      error: (error) => {
        this.error =
          error.message || 'Failed to update order. Please try again.';
        this.isSubmitting = false;
        console.error('Error updating order:', error);
      },
    });
  }

  cancelEdit(): void {
    this.router.navigate(['/dashboard/orders']);
  }

  viewOrder(): void {
    if (this.orderId) {
      this.router.navigate(['/dashboard/view-order', this.orderId]);
    }
  }
}
