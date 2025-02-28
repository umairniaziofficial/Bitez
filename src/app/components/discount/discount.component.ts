import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { DiscountService } from '../../services/discount.service';
import { Discount } from '../../models/discount.model';

@Component({
  selector: 'app-discount',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate(
          '800ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('cardTransition', [
      state('void', style({ opacity: 0 })),
      state('current', style({ opacity: 1 })),
      transition('* => current', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
      ]),
      transition('current => void', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('badgeBounce', [
      transition(':enter', [
        style({ transform: 'translateY(-20px) rotate(3deg)', opacity: 0 }),
        animate(
          '500ms 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          style({ transform: 'translateY(0) rotate(3deg)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class DiscountComponent implements OnInit {
  private discountService = inject(DiscountService);

  discounts: Discount[] = [];
  currentDiscount = 0;
  loading = true;
  error = false;
  touchStartX = 0;
  touchEndX = 0;
  discountState = 'current';

  ngOnInit(): void {
    this.loadDiscounts();
  }

  loadDiscounts(): void {
    this.discountService.getDiscounts().subscribe({
      next: (discounts: Discount[]) => {
        this.discounts = discounts;
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error('Failed to load discounts', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  nextDiscount(): void {
    if (this.discounts.length > 0) {
      this.currentDiscount = (this.currentDiscount + 1) % this.discounts.length;
      this.discountState = 'current';
    }
  }

  prevDiscount(): void {
    if (this.discounts.length > 0) {
      this.currentDiscount = (this.currentDiscount - 1 + this.discounts.length) % this.discounts.length;
      this.discountState = 'current';
    }
  }

  goToDiscount(index: number): void {
    if (
      index >= 0 &&
      index < this.discounts.length &&
      index !== this.currentDiscount
    ) {
      this.currentDiscount = index;
      this.discountState = 'current';
    }
  }

  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      const btnText = document.getElementById('copyBtnText');
      if (btnText) {
        const originalText = btnText.textContent || 'Copy';
        btnText.textContent = 'Copied!';
        setTimeout(() => {
          btnText.textContent = originalText;
        }, 2000);
      }
    });
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleSwipe(): void {
    const swipeThreshold = 50;
    const swipeDistance = this.touchEndX - this.touchStartX;
    if (swipeDistance > swipeThreshold) {
      this.prevDiscount();
    } else if (swipeDistance < -swipeThreshold) {
      this.nextDiscount();
    }
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/assets/images/discount-placeholder.jpg';
  }
}
