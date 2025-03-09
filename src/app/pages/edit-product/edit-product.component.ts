import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ProductServiceService,
  Product,
} from '../../services/product-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  providers: [ProductServiceService],
})
export class EditProductComponent implements OnInit {
  productId: string | null = null;
  product: Product = {
    name: '',
    description: '',
    price: 0,
    category: '',
    ImgUrl: '',
    rating: 4.5,
  };

  isLoading = true;
  isSubmitting = false;
  error = '';
  success = '';
  imageLoaded = false;
  imageError = false;

  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.loadProduct();
    } else {
      this.error = 'No product ID provided';
      this.isLoading = false;
    }
  }

  loadProduct(): void {
    this.isLoading = true;
    this.error = '';

    if (!this.productId) return;

    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.imageLoaded = false;
        this.imageError = false;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.error = 'Failed to load product. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.isSubmitting || !this.productId) return;

    this.isSubmitting = true;
    this.error = '';
    this.success = '';

    this.productService.updateProduct(this.productId, this.product).subscribe({
      next: () => {
        this.success = 'Product updated successfully!';
        this.isSubmitting = false;

        setTimeout(() => this.router.navigate(['/dashboard/products']), 1500);
      },
      error: (error) => {
        this.error =
          error.message || 'Failed to update product. Please try again.';
        this.isSubmitting = false;
        console.error('Error updating product:', error);
      },
    });
  }

  cancelEdit(): void {
    this.router.navigate(['/dashboard/products']);
  }
}
