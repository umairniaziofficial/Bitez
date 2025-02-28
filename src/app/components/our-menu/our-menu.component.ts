import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  ImageSrc: string;
}

@Component({
  selector: 'app-our-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './our-menu.component.html',
  styleUrl: './our-menu.component.css',
})
export class OurMenuComponent {
  public menuCategories = [
    'Special Foods',
    'Indian',
    'Drinks',
    'Desserts',
    'Snacks',
    'Chinese',
  ];
  public selectedCategory = 'Special Foods';

  public menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken",
      price: 15.99,
      rating: 4,
      category: "Indian",
      ImageSrc: "assets/images/butter-chicken.jpg"
    },
    // ...Add more items as needed
  ];

  get filteredItems() {
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  addToCart(item: MenuItem) {
    // Implement cart functionality
    console.log('Added to cart:', item);
  }
}
