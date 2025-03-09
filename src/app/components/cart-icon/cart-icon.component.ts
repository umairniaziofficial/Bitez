import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  template: `
    <div class="relative">
      <a routerLink="/cart" class="flex items-center text-gray-600 hover:text-secondary">
        <mat-icon class="relative">shopping_cart</mat-icon>
        <span *ngIf="cartItemCount > 0" 
              class="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {{ cartItemCount > 9 ? '9+' : cartItemCount }}
        </span>
      </a>
    </div>
  `,
  styles: []
})
export class CartIconComponent implements OnInit {
  cartItemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
