import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';

interface DishItem {
  title: string;
  rating: number;
  description: string;
  price: number;
  ImageSrc: string;
  isWishlisted?: boolean;
}

@Component({
  selector: 'app-popular-dishes',
  standalone: true,
  imports: [MatIconModule, NgFor, NgIf],
  templateUrl: './popular-dishes.component.html',
  styleUrls: ['./popular-dishes.component.css']
})
export class PopularDishesComponent implements OnInit {
  public cardsData: DishItem[] = [
    {
      title: "Burger",
      rating: 4,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eligendi possimus sed vel, labore neque id harum enim suscipit unde!",
      price: 10,
      ImageSrc: "/Burger.png"
    },
    {
      title: "Pizza",
      rating: 5,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eligendi possimus sed vel, labore neque id harum enim suscipit unde!",
      price: 15,
      ImageSrc: "/Pizza.png"
    },
    {
      title: "Steak",
      rating: 3,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eligendi possimus sed vel, labore neque id harum enim suscipit unde!",
      price: 20,
      ImageSrc: "/Steak.png"
    },
    {
      title: "Beef Veggie",
      rating: 4,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eligendi possimus sed vel, labore neque id harum enim suscipit unde!",
      price: 12,
      ImageSrc: "/BeefVeg.png"
    },
    {
      title: "Briyani",
      rating: 5,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eligendi possimus sed vel, labore neque id harum enim suscipit unde!",
      price: 8,
      ImageSrc: "/Briyani.png"
    }
  ];

  public visibleItems = 4; // Desktop view shows 4 items
  public mobileVisibleItems = 3; // Mobile initially shows 3 items
  public isMobile = false;
  public offset = 0;

  // Add new property for single item width
  private readonly singleItemWidth = 25; // 25% width per item
  private readonly gapWidth = 1; // 1% gap between items

  private tempRating: number | null = null;

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    this.resetView();
  }

  private resetView() {
    this.offset = 0;
    if (this.isMobile) {
      this.mobileVisibleItems = 3;
    }
  }

  nextSlide() {
    const maxOffset = -((this.cardsData.length - this.visibleItems) * (this.singleItemWidth + this.gapWidth));
    if (this.offset > maxOffset) {
      // Move by single item width instead of full row
      this.offset -= (this.singleItemWidth + this.gapWidth);
      // Ensure we don't scroll beyond last item
      this.offset = Math.max(this.offset, maxOffset);
    }
  }

  previousSlide() {
    if (this.offset < 0) {
      // Move by single item width instead of full row
      this.offset += (this.singleItemWidth + this.gapWidth);
      // Ensure we don't scroll beyond first item
      this.offset = Math.min(this.offset, 0);
    }
  }

  loadMore() {
    if (this.mobileVisibleItems + 3 <= this.cardsData.length) {
      this.mobileVisibleItems += 3;
    } else {
      this.mobileVisibleItems = this.cardsData.length;
    }
  }

  get showLoadMore(): boolean {
    return this.isMobile && this.mobileVisibleItems < this.cardsData.length;
  }

  get visibleCards() {
    return this.isMobile 
      ? this.cardsData.slice(0, this.mobileVisibleItems)
      : this.cardsData;
  }

  openQuickView(item: DishItem) {
    // Implement quick view logic here
    console.log('Quick view:', item);
  }

  toggleWishlist(item: DishItem) {
    item.isWishlisted = !item.isWishlisted;
    console.log('Wishlist toggled:', item);
  }

  previewRating(rating: number) {
    this.tempRating = rating;
  }

  resetRating() {
    this.tempRating = null;
  }

  rateItem(item: DishItem, rating: number) {
    item.rating = rating;
    console.log('Rated item:', item);
  }

  addToCart(item: DishItem) {
    console.log('Added to cart:', item);
    // Implement cart logic here
  }
}