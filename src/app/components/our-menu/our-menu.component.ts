import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  ProductServiceService,
  Product,
} from '../../services/product-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-our-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    CartModalComponent,
  ],
  templateUrl: './our-menu.component.html',
  styleUrl: './our-menu.component.css',
  providers: [ProductServiceService],
})
export class OurMenuComponent implements OnInit {
  public ProductCategories = {
    Special_Foods: 'Special Foods',
    Indian: 'Indian',
    Drinks: 'Drinks',
    Desserts: 'Desserts',
    Snacks: 'Snacks',
    Chinese: 'Chinese',
  };

  public menuCategories: string[] = [];
  public selectedCategory = '';
  public menuItems: Product[] = [];
  public isLoading = true;
  public error = '';
  public showCartModal = false;

  constructor(
    private productService: ProductServiceService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.cartService.cartModalVisible$.subscribe((visible) => {
      this.showCartModal = visible;
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = '';

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.menuItems = products.map((product) => ({
          ...product,

          rating: product.rating || 4.5,
        }));

        this.extractCategories();

        if (this.menuCategories.length > 0) {
          this.selectedCategory = this.menuCategories[0];
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error = 'Failed to load menu items. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  private extractCategories(): void {
    if (this.menuItems.length > 0) {
      const uniqueCategories = [
        ...new Set(this.menuItems.map((item) => item.category)),
      ];

      this.menuCategories = uniqueCategories.sort();
    } else {
      this.menuCategories = Object.values(this.ProductCategories);
    }
  }

  get filteredItems() {
    if (!this.selectedCategory) {
      return this.menuItems;
    }
    return this.menuItems.filter(
      (item) => item.category === this.selectedCategory
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  addToCart(item: Product) {
    if (!item || !item._id) return;

    this.cartService.addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imgUrl: item.ImgUrl,
    });
  }

  closeCartModal(): void {
    this.cartService.hideCartModal();
  }
}
