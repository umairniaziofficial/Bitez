import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),

    trigger('slideInOut', [
      state(
        'void',
        style({
          transform: 'translateX(100%)',
        })
      ),
      state(
        '*',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition(':enter', [animate('300ms ease-out')]),
      transition(':leave', [
        animate('250ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class CartModalComponent implements OnInit {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  cartItems: CartItem[] = [];
  cartTotal = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });

    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  viewCart(): void {
    this.closeModal();
  }

  checkout(): void {
    this.closeModal();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.isVisible) {
      this.closeModal();
    }
  }

  @HostListener('window:scroll', ['$event'])
  blockScrolling(event: Event) {
    if (this.isVisible) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    return true;
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.id);

    if (this.cartItems.length <= 1) {
      setTimeout(() => {
        this.closeModal();
      }, 500);
    }
  }
}
