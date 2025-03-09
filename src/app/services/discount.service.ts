import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Discount } from '../models/discount.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private mockDiscounts: Discount[] = [
    {
      id: '1',
      title: 'Weekend Special',
      description: 'Get 20% off on all orders above $50 this weekend only! Valid for both dine-in and takeaway orders. Perfect for family gatherings or weekend parties. Discount automatically applied at checkout. Cannot be combined with other offers.',
      code: 'WEEKEND20',
      percentOff: 20,
      imageUrl: '/discount/Weekend Special.jpg',
      expiryDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
      link: '/order'
    },
    {
      id: '2',
      title: 'New Customer Offer',
      description: 'First-time customers enjoy 15% discount on their first order! Create an account and verify your email to unlock this special welcome offer. Valid for all menu items including our signature dishes. Minimum order value of $30 required. Limited time offer for new registrations only.',
      code: 'WELCOME15',
      percentOff: 15,
      imageUrl: '/discount/New Customer Offer.jpg',
      expiryDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
      link: '/order'
    },
    {
      id: '3',
      title: 'Family Meal Deal',
      description: 'Order a family meal and get a free dessert worth $10! Choose from our selection of premium desserts including chocolate cake, ice cream sundae, or fruit parfait. Perfect for families of 4-6 people. Available for both delivery and pickup orders. Family meal must include at least one main course and two sides.',
      code: 'FAMILY10',
      percentOff: 10,
      imageUrl: '/discount/Family Meal Deal.jpg',
      expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      link: '/menu/family'
    }
  ];

  constructor() { }

  getDiscounts(): Observable<Discount[]> {
    return of(this.mockDiscounts);
  }

  getDiscountById(id: string): Observable<Discount | undefined> {
    return of(this.mockDiscounts.find(discount => discount.id === id));
  }
}
