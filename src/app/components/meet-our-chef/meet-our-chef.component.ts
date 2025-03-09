import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

interface IChef {
  name: string;
  role: string;
  ImageSrc: string;
  bio: string;
  featured?: boolean;
}

@Component({
  selector: 'app-meet-our-chef',
  imports: [CommonModule, MatIcon],
  templateUrl: './meet-our-chef.component.html',
  styleUrl: './meet-our-chef.component.css',
  standalone: true,
})
export class MeetOurChefComponent implements OnInit, OnDestroy {
  public Math = Math;

  public chefsData: IChef[] = [
    {
      name: 'Alex Johnson',
      role: 'Executive Chef',
      ImageSrc: '/chef/1.png',
      bio: 'Specializing in Mediterranean cuisine with over 10 years of culinary experience.',
      featured: true,
    },
    {
      name: 'Maria Rodriguez',
      role: 'Pastry Chef',
      ImageSrc: '/chef/2.png',
      bio: 'Award-winning pastry expert creating unique dessert experiences.'
    },
    {
      name: 'David Kim',
      role: 'Sous Chef',
      ImageSrc: '/chef/3.png',
      bio: 'Trained in French and Asian fusion cuisine with a flair for presentation.'
    },
    {
      name: 'Sarah Williams',
      role: 'Head Chef',
      ImageSrc: '/chef/4.png',
      bio: 'Farm-to-table advocate specializing in seasonal and local ingredients.'
    },
    {
      name: 'James Chen',
      role: 'Culinary Director',
      ImageSrc: '/chef/5.png',
      bio: 'Michelin-starred chef with expertise in innovative cooking techniques.'
    },
  ];

  public visibleItems = 4;
  public mobileVisibleItems = 2;
  public isMobile = false;
  public isTablet = false;
  public offset = 0;
  public currentSlide = 0;
  public autoplayInterval: any;
  public isHovered = false;
  private resizeObserver: ResizeObserver;

  public readonly singleItemWidth = 25;
  public readonly gapWidth = 1;
  private readonly tabletBreakpoint = 1024;
  private readonly mobileBreakpoint = 768;
  private readonly autoplaySpeed = 5000; 

  constructor() {
    this.resizeObserver = new ResizeObserver(() => this.checkScreenSize());
  }

  ngOnInit() {
    this.checkScreenSize();
    this.resizeObserver.observe(document.body);
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
    this.stopAutoplay();
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
    this.currentSlide = 0;
    if (this.isMobile) {
      this.mobileVisibleItems = 2;
    }
  }

  nextSlide() {
    const visibleCount = this.isTablet ? 2 : this.visibleItems;
    const maxOffset = -(
      (this.chefsData.length - visibleCount) *
      (this.singleItemWidth + this.gapWidth)
    );

    if (this.offset > maxOffset) {
      this.offset -= this.singleItemWidth + this.gapWidth;
      this.offset = Math.max(this.offset, maxOffset);
      this.currentSlide = Math.min(this.currentSlide + 1, this.chefsData.length - visibleCount);
    }
  }

  previousSlide() {
    if (this.offset < 0) {
      this.offset += this.singleItemWidth + this.gapWidth;
      this.offset = Math.min(this.offset, 0);
      this.currentSlide = Math.max(this.currentSlide - 1, 0);
    }
  }

  goToSlide(index: number) {
    const visibleCount = this.isTablet ? 2 : this.visibleItems;
    const maxIndex = this.chefsData.length - visibleCount;
    this.currentSlide = Math.min(Math.max(0, index), maxIndex);
    this.offset = -(this.currentSlide * (this.singleItemWidth + this.gapWidth));
  }

  loadMore() {
    if (this.mobileVisibleItems + 2 <= this.chefsData.length) {
      this.mobileVisibleItems += 2;
    } else {
      this.mobileVisibleItems = this.chefsData.length;
    }
  }

  startAutoplay() {
    if (this.autoplayInterval) return;
    
    this.autoplayInterval = setInterval(() => {
      if (!this.isHovered) {
        const visibleCount = this.isTablet ? 2 : this.visibleItems;
        if (this.currentSlide < this.chefsData.length - visibleCount) {
          this.nextSlide();
        } else {
          this.goToSlide(0);
        }
      }
    }, this.autoplaySpeed);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  setHovered(status: boolean) {
    this.isHovered = status;
  }

  get showLoadMore(): boolean {
    return this.isMobile && this.mobileVisibleItems < this.chefsData.length;
  }

  get visibleCards() {
    return this.isMobile
      ? this.chefsData.slice(0, this.mobileVisibleItems)
      : this.chefsData;
  }

  get cardWidth(): string {
    if (this.isMobile) return '100%';
    if (this.isTablet) return '48%';
    return '24%';
  }

  get slideCount(): number {
    const visibleCount = this.isTablet ? 2 : this.visibleItems;
    return Math.max(0, this.chefsData.length - visibleCount + 1);
  }

  get featuredChef(): IChef | undefined {
    return this.chefsData.find(chef => chef.featured);
  }
}
