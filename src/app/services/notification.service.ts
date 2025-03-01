import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    // In a real application, you might use a UI library like ngx-toastr
    // or Material snackbar. For now, this is a simple implementation
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // For a basic UI feedback, we can use alert for now
    // In production, replace with a proper notification component
    if (type === 'error') {
      alert(`Error: ${message}`);
    } else if (type === 'success') {
      alert(`Success: ${message}`);
    } else {
      alert(message);
    }
  }
}
