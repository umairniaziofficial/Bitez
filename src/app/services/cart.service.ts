import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imgUrl: string;
}

export interface CheckoutData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartTotalSubject = new BehaviorSubject<number>(0);
  private cartCountSubject = new BehaviorSubject<number>(0);

  public cartItems$ = this.cartItemsSubject.asObservable();
  public cartTotal$ = this.cartTotalSubject.asObservable();
  public cartCount$ = this.cartCountSubject.asObservable();

  private apiUrl = `${environment.apiUrl}/api`;

  private cartModalVisibleSubject = new BehaviorSubject<boolean>(false);
  public cartModalVisible$ = this.cartModalVisibleSubject.asObservable();
  private lastAddedItem: CartItem | null = null;
  private lastAddedItemSubject = new BehaviorSubject<CartItem | null>(null);
  public lastAddedItem$ = this.lastAddedItemSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  addToCart(item: CartItem): void {
    const existingItemIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex > -1) {
      this.cartItems[existingItemIndex].quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item });
    }

    this.updateCart();
    this.lastAddedItem = { ...item };
    this.lastAddedItemSubject.next(this.lastAddedItem);
    this.showCartModal();
    this.showAddToCartNotification(item.name);
  }

  removeItem(itemId: string): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    this.updateCart();
  }

  updateQuantity(itemId: string, quantity: number): void {
    const itemIndex = this.cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeItem(itemId);
      } else {
        this.cartItems[itemIndex].quantity = quantity;
        this.updateCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  checkout(checkoutData: CheckoutData): Observable<any> {
    const orderProducts = this.cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const orderData = {
      products: orderProducts,
      customerEmail: checkoutData.customerEmail,
      customerName: checkoutData.customerName,
      customerPhone: checkoutData.customerPhone,
      total: this.getCartTotal(),
      shippingAddress: checkoutData.shippingAddress,
      paymentMethod:
        checkoutData.paymentMethod === 'cod'
          ? 'Cash On Delivery'
          : checkoutData.paymentMethod === 'creditCard'
          ? 'Credit Card'
          : 'PayPal',
    };

    console.log('Sending checkout request:', orderData);

    return this.http.post(`${this.apiUrl}/checkout`, orderData);
  }

  private updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next([...this.cartItems]);
    this.cartTotalSubject.next(this.getCartTotal());
    this.cartCountSubject.next(this.getCartItemCount());
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      try {
        this.cartItems = JSON.parse(savedCart);
        this.updateCart();
      } catch (err) {
        console.error('Error loading cart from local storage:', err);
        localStorage.removeItem('cart');
      }
    }
  }

  private showAddToCartNotification(productName: string): void {
    console.log(`${productName} added to cart`);
  }

  showCartModal(): void {
    this.cartModalVisibleSubject.next(true);

    document.body.classList.add('overflow-hidden');

    setTimeout(() => {
      this.hideCartModal();
    }, 5000);
  }

  hideCartModal(): void {
    this.cartModalVisibleSubject.next(false);

    document.body.classList.remove('overflow-hidden');
  }
}
