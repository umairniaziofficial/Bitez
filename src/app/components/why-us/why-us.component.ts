import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate(
          '0.6s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('slideIn', [
      state('void', style({ opacity: 0, transform: 'translateX(-30px)' })),
      transition(':enter', [
        animate(
          '0.8s 0.2s ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
    trigger('fadeInUp', [
      state('hidden', style({ opacity: 0, transform: 'translateY(40px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('0.8s ease-out')),
    ]),
    trigger('slideInRight', [
      state('hidden', style({ opacity: 0, transform: 'translateX(40px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('1s ease-out')),
    ]),
  ],
})
export class WhyUsComponent implements OnInit {
  activeImageIndex = 0;
  images = [
    { src: '/Food1.jpg', alt: 'Delicious Food Platter', active: true },
    { src: '/Food2.jpg', alt: 'Chef Preparing Food', active: false },
    { src: '/Food3.jpg', alt: 'Restaurant Ambiance', active: false },
  ];

  storyPoints = [
    {
      icon: 'restaurant_menu',
      title: 'Quality Ingredients',
      description:
        'We source only the freshest, highest-quality ingredients for every dish.',
    },
    {
      icon: 'favorite',
      title: 'Made with Love',
      description: 'Each recipe is crafted with passion by our expert chefs.',
    },
    {
      icon: 'diversity_3',
      title: 'Community First',
      description:
        'We believe in bringing people together through delicious food experiences.',
    },
  ];

  isInViewport = false;
  scrollActive = false;
  parallaxX = 0;
  parallaxY = 0;
  selectedFoodIndex: number | null = null;
  tooltipVisible = false;
  tooltipX = 0;
  tooltipY = 0;
  tooltipData = { name: '', description: '' };

  foodTypes = [
    {
      name: 'Burgers',
      icon: 'lunch_dining',
      description: 'Juicy patties with fresh vegetables on toasted buns.',
      image: '/food-cards/1.png',
    },
    {
      name: 'Biryani',
      icon: 'rice_bowl',
      description:
        'Aromatic rice dish layered with spices and your choice of protein.',
      image: '/food-cards/3.png',
    },
    {
      name: 'Pizza',
      icon: 'local_pizza',
      description: 'Hand-tossed crust with premium toppings and melted cheese.',
      image: '/food-cards/2.png',
    },
  ];

  floatingFoodIcons = [
    { icon: 'restaurant', x: 10, y: 20, color: 'text-orange-500' },
    { icon: 'local_pizza', x: 85, y: 15, color: 'text-red-500' },
    { icon: 'lunch_dining', x: 70, y: 80, color: 'text-yellow-600' },
    { icon: 'rice_bowl', x: 20, y: 75, color: 'text-orange-600' },
    { icon: 'ramen_dining', x: 40, y: 30, color: 'text-red-400' },
    { icon: 'bakery_dining', x: 60, y: 60, color: 'text-yellow-500' },
  ];

  foodTooltips = {
    biryani: {
      name: 'Biryani',
      description:
        'Fragrant basmati rice cooked with aromatic spices and tender meat',
    },
    pizza: {
      name: 'Pizza',
      description:
        'Crispy crust topped with tangy sauce, melted cheese and fresh toppings',
    },
    burger: {
      name: 'Burger',
      description:
        'Juicy patty between soft buns with fresh vegetables and special sauce',
    },
    noodles: {
      name: 'Noodles',
      description:
        'Perfectly cooked noodles tossed with vegetables and savory sauces',
    },
  };

  currentFoodImage = '/Biryani.png';
  isImageChanging = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.checkScroll();
    this.startImageRotation();

    setTimeout(() => {
      this.selectFood(0);
    }, 1000);
  }

  @HostListener('window:scroll')
  checkScroll() {
    const element = document.querySelector('.hero-section');
    if (!element) return;

    const rect = element.getBoundingClientRect();
    this.isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;

    this.scrollActive = window.scrollY > 100;

    const storyElement = document.querySelector('.story-container');
    if (storyElement) {
      const storyRect = storyElement.getBoundingClientRect();
      this.isInViewport =
        storyRect.top >= 0 &&
        storyRect.left >= 0 &&
        storyRect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        storyRect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
    }
  }

  handleParallax(event: MouseEvent) {
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const percentX = mouseX / rect.width;
    const percentY = mouseY / rect.height;

    this.parallaxX = (0.5 - percentX) * 20;
    this.parallaxY = (0.5 - percentY) * 20;
  }

  startImageRotation() {
    setInterval(() => {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
      this.images.forEach(
        (img, i) => (img.active = i === this.activeImageIndex)
      );
    }, 5000);
  }

  setActiveImage(index: number) {
    this.activeImageIndex = index;
    this.images.forEach((img, i) => (img.active = i === index));
  }

  selectFood(index: number) {
    if (this.selectedFoodIndex === index) {
      this.selectedFoodIndex = null;
    } else {
      this.selectedFoodIndex = index;
      this.isImageChanging = true;
      setTimeout(() => {
        this.currentFoodImage = this.foodTypes[index].image;
        setTimeout(() => {
          this.isImageChanging = false;
        }, 300);
      }, 200);
    }
  }

  showFoodTooltip(foodType: string, event: MouseEvent) {
    const tooltipData =
      this.foodTooltips[foodType as keyof typeof this.foodTooltips];
    if (tooltipData) {
      this.tooltipData = tooltipData;
      this.tooltipX = event.clientX;
      this.tooltipY = event.clientY - 80;
      this.tooltipVisible = true;
    }
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

  scrollToStory() {
    const storySection = document.getElementById('story-section');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
