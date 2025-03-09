import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ProductServiceService,
  Product,
} from '../../services/product-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [ProductServiceService],
})
export class AddProductComponent {
  product = {
    name: '',
    description: '',
    price: null,
    category: '',
    imgUrl: '',
    rating: 4.5,
  };

  isSubmitting = false;
  error = '';
  success = '';
  imageError = '';
  showImagePreview = false;
  isImageLoading = false;

  constructor(
    private productService: ProductServiceService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.error = '';
    this.success = '';

    const productToCreate: Product = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price ?? 0,
      category: this.product.category,
      ImgUrl: this.product.imgUrl,
      rating: this.product.rating,
    };

    this.productService.createProduct(productToCreate).subscribe({
      next: (response) => {
        this.success = 'Product added successfully!';
        this.isSubmitting = false;

        this.product = {
          name: '',
          description: '',
          price: null,
          category: '',
          imgUrl: '',
          rating: 4.5,
        };
      },
      error: (error) => {
        this.error =
          error.message || 'Failed to add product. Please try again.';
        this.isSubmitting = false;
        console.error('Error adding product:', error);
      },
    });
  }

  validateAndPreviewImage() {
    this.imageError = '';
    this.showImagePreview = false;
    this.isImageLoading = false;

    if (!this.product.imgUrl) return;

    try {
      new URL(this.product.imgUrl);
      this.showImagePreview = true;
      this.isImageLoading = true;
    } catch (e) {
      this.imageError = 'Please enter a valid URL';
    }
  }

  handleImageError() {
    this.imageError = 'Failed to load image from the provided URL';
    this.showImagePreview = false;
    this.isImageLoading = false;
  }

  handleImageLoaded() {
    this.isImageLoading = false;
  }
}
