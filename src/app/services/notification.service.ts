import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  show(message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    console.log(`${type.toUpperCase()}: ${message}`);

    if (type === 'error') {
      alert(`Error: ${message}`);
    } else if (type === 'success') {
      alert(`Success: ${message}`);
    } else {
      alert(message);
    }
  }
}
