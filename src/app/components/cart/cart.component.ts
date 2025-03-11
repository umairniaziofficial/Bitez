import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  showAnimation = true;
  itemAnimations: { [key: string]: boolean } = {};

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.triggerAnimation();
    });

    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
    this.triggerItemAnimation(item.id);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  removeFromCart(item: CartItem): void {
    this.showAnimation = true;
    this.cartService.removeItem(item.id);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  proceedToCheckout(): void {
    // Add a nice animation effect before navigating
    setTimeout(() => {
      this.router.navigate(['/checkout']);
    }, 300);
  }

  private triggerAnimation(): void {
    this.showAnimation = false;
    setTimeout(() => {
      this.showAnimation = true;
    }, 10);
  }

  private triggerItemAnimation(itemId: string): void {
    this.itemAnimations[itemId] = true;
    setTimeout(() => {
      this.itemAnimations[itemId] = false;
    }, 300);
  }
}
