import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CartService, CartItem, CheckoutData } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  checkoutForm: FormGroup;
  isSubmitting = false;
  error = '';
  success = '';
  orderCompleted = false;
  
  paymentMethods = [
    { id: 'creditCard', name: 'Credit Card' },
    { id: 'cod', name: 'Cash On Delivery' },
    { id: 'paypal', name: 'PayPal' }
  ];

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      customerInfo: this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required]
      }),
      shippingAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['', Validators.required]
      }),
      paymentMethod: ['cod', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCartData();
    
    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  loadCartData(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid || this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.error = '';
    
    const formValue = this.checkoutForm.value;
    const checkoutData: CheckoutData = {
      customerName: formValue.customerInfo.name,
      customerEmail: formValue.customerInfo.email,
      customerPhone: formValue.customerInfo.phone,
      shippingAddress: formValue.shippingAddress,
      paymentMethod: formValue.paymentMethod
    };
    
    console.log('Submitting checkout:', checkoutData);
    
    this.cartService.checkout(checkoutData).subscribe({
      next: (response) => {
        console.log('Checkout success:', response);
        this.success = 'Order placed successfully!';
        this.orderCompleted = true;
        this.cartService.clearCart();
        setTimeout(() => {
          this.router.navigate(['/order-success', response._id]);
        }, 2000);
      },
      error: (err) => {
        console.error('Checkout error:', err);

        if (err.error && err.error.message) {
          this.error = `Error: ${err.error.message}`;
        } else if (err.message) {
          this.error = `Error: ${err.message}`;
        } else {
          this.error = 'Failed to place your order. Please try again.';
        }
        this.isSubmitting = false;
      }
    });
  }

  cancelCheckout(): void {
    this.router.navigate(['/cart']);
  }
}
