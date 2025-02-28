import { Injectable } from '@angular/core';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {
  private foodItems: FoodItem[] = [
    {
      id: 'biryani',
      name: 'Biryani',
      description: 'Fragrant basmati rice cooked with aromatic spices and tender meat or vegetables',
      icon: 'rice_bowl',
      imageUrl: '/assets/images/biryani.jpg',
      category: 'rice'
    },
    {
      id: 'pizza',
      name: 'Pizza',
      description: 'Crispy crust topped with tangy sauce, melted cheese and fresh toppings',
      icon: 'local_pizza',
      imageUrl: '/assets/images/pizza.jpg',
      category: 'italian'
    },
    {
      id: 'burger',
      name: 'Burger',
      description: 'Juicy patty between soft buns with fresh vegetables and special sauce',
      icon: 'lunch_dining',
      imageUrl: '/assets/images/burger.jpg',
      category: 'fast-food'
    },
    {
      id: 'noodles',
      name: 'Noodles',
      description: 'Perfectly cooked noodles tossed with vegetables and savory sauces',
      icon: 'ramen_dining',
      imageUrl: '/assets/images/noodles.jpg',
      category: 'asian'
    }
  ];

  constructor() { }

  getAllFoodItems(): FoodItem[] {
    return [...this.foodItems];
  }

  getFoodItemById(id: string): FoodItem | undefined {
    return this.foodItems.find(item => item.id === id);
  }

  getFoodItemsByCategory(category: string): FoodItem[] {
    return this.foodItems.filter(item => item.category === category);
  }
}


