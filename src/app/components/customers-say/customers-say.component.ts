import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

interface CustomerReview {
  description: string;
  avatarSrc: string;
  name: string;
  company: string;
  companyLogo: string;
  position: string;
}

@Component({
  selector: 'app-customers-say',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './customers-say.component.html',
  styleUrls: ['./customers-say.component.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class CustomersSayComponent implements OnInit, OnDestroy {
  public customersData: CustomerReview[] = [
    {
      description:
        'The platform has revolutionized our food delivery operations. The seamless integration and robust features have helped us serve customers better.',
      avatarSrc: '/customer/customer1.png',
      name: 'Sriharsha Majety',
      company: 'Swiggy',
      companyLogo: '/logos/swiggy.png',
      position: 'Co-founder & CEO',
    },
    {
      description:
        'An excellent solution that has helped us streamline our restaurant operations and enhance customer satisfaction significantly.',
      avatarSrc: '/customer/customer2.png',
      name: 'Deepinder Goyal',
      company: 'Zomato',
      companyLogo: '/logos/zomato.png',
      position: 'Founder & CEO',
    },
    {
      description:
        'The system has helped us maintain consistent quality and service across all our outlets. Highly recommended for restaurant chains.',
      avatarSrc: '/customer/customer3.png',
      name: 'Tony Xu',
      company: 'DoorDash',
      companyLogo: '/logos/doordash.png',
      position: 'Co-founder & CEO',
    },
    {
      description:
        'The analytics and insights provided have helped us make data-driven decisions and improve our service quality.',
      avatarSrc: '/customer/customer5.png',
      name: 'Niklas Östberg',
      company: 'Delivery Hero',
      companyLogo: '/logos/delivery-hero.png',
      position: 'Co-founder & CEO',
    },
    {
      description:
        'This platform has been instrumental in our global expansion. The scalability and reliability are impressive.',
      avatarSrc: '/customer/customer4.png',
      name: 'Jitse Groen',
      companyLogo: '/logos/just-eat.png',
      company: 'Just Eat',
      position: 'CEO',
    },
  ];

  public visibleItems = 4;
  public mobileVisibleItems = 2;
  public isMobile = false;
  public isTablet = false;
  public offset = 0;
  private resizeObserver: ResizeObserver;

  public readonly singleItemWidth = 25;
  public readonly gapWidth = 1;
  private readonly tabletBreakpoint = 1024;
  private readonly mobileBreakpoint = 768;

  autoPlayInterval: any;
  isPaused = false;
  currentIndex = 0;

  constructor() {
    this.resizeObserver = new ResizeObserver(() => this.checkScreenSize());
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
    this.visibleItems = this.isMobile ? 1 : 3;
    this.resetPosition();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.previousSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    }
  }

  ngOnInit() {
    this.checkScreenSize();
    this.resizeObserver.observe(document.body);
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
    this.stopAutoPlay();
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    this.isMobile = width < this.mobileBreakpoint;
    this.isTablet =
      width >= this.mobileBreakpoint && width < this.tabletBreakpoint;
    this.resetView();
  }

  private resetView() {
    this.offset = 0;
    if (this.isMobile) {
      this.mobileVisibleItems = 2;
    }
  }

  nextSlide() {
    const visibleCount = this.isTablet ? 2 : this.visibleItems;
    const maxOffset = -(
      (this.customersData.length - visibleCount) *
      (this.singleItemWidth + this.gapWidth)
    );

    if (this.offset > maxOffset) {
      this.offset -= this.singleItemWidth + this.gapWidth;
      this.offset = Math.max(this.offset, maxOffset);
      this.currentIndex++;
    } else {
      this.resetPosition();
    }
  }

  previousSlide() {
    if (this.offset < 0) {
      this.offset += this.singleItemWidth + this.gapWidth;
      this.offset = Math.min(this.offset, 0);
      this.currentIndex--;
    }
  }

  loadMore() {
    if (this.mobileVisibleItems + 2 <= this.customersData.length) {
      this.mobileVisibleItems += 2;
    } else {
      this.mobileVisibleItems = this.customersData.length;
    }
  }

  get showLoadMore(): boolean {
    return this.isMobile && this.mobileVisibleItems < this.customersData.length;
  }

  get visibleCards() {
    return this.isMobile
      ? this.customersData.slice(0, this.mobileVisibleItems)
      : this.customersData;
  }

  get cardWidth(): string {
    if (this.isMobile) return '100%';
    if (this.isTablet) return '48%';
    return '24%';
  }

  startAutoPlay() {
    if (!this.autoPlayInterval) {
      this.autoPlayInterval = setInterval(() => {
        if (!this.isPaused) {
          this.nextSlide();
        }
      }, 5000);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  pauseAutoPlay() {
    this.isPaused = true;
  }

  resumeAutoPlay() {
    this.isPaused = false;
  }

  resetPosition() {
    this.offset = 0;
    this.currentIndex = 0;
  }

  get progressPercentage(): number {
    return (
      (this.currentIndex / (this.customersData.length - this.visibleItems)) *
      100
    );
  }
}
