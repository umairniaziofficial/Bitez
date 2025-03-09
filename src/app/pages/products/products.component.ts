import { NgFor, NgIf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  ProductServiceService,
  Product,
} from '../../services/product-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, MatIcon, NgIf, NgClass, HttpClientModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductServiceService],
})
export class ProductsComponent implements OnInit {
  public ProductCategories = {
    Special_Foods: 'Special Foods',
    Indian: 'Indian',
    Drinks: 'Drinks',
    Deserts: 'Desserts',
    Snacks: 'Snacks',
    Chinese: 'Chinese',
  };

  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public selectedCategory: string | null = null;
  public isLoading: boolean = true;
  public error: string = '';
  public searchQuery: string = '';

  constructor(
    private productService: ProductServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.error = '';

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.resetFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  getCategories() {
    if (this.products.length > 0) {
      const uniqueCategories = [
        ...new Set(this.products.map((product) => product.category)),
      ];
      return uniqueCategories.map((category) => {
        const displayName =
          Object.entries(this.ProductCategories).find(
            ([key]) => key === category || key === category.replace(' ', '_')
          )?.[1] || category;
        return { key: category, value: displayName };
      });
    }

    return Object.entries(this.ProductCategories).map(([key, value]) => ({
      key,
      value,
    }));
  }

  filterByCategory(categoryKey: string) {
    this.selectedCategory = categoryKey;
    this.applyFilters();
  }

  resetFilters() {
    this.selectedCategory = null;
    this.searchQuery = '';
    this.filteredProducts = [...this.products];
  }

  applyFilters() {
    let filtered = [...this.products];

    if (this.selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    this.filteredProducts = filtered;
  }

  onSearchInput() {
    this.applyFilters();
  }

  editProduct(product: Product) {
    if (product._id) {
      this.router.navigate(['/dashboard/edit-product', product._id]);
    }
  }

  deleteProduct(product: Product) {
    if (!product._id) return;

    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product._id).subscribe({
        next: () => {
          this.products = this.products.filter((p) => p._id !== product._id);
          this.resetFilters();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product. Please try again later.');
        },
      });
    }
  }
}
