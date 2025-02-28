import { Component, OnInit, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [animate('0.6s ease-out')])
    ]),
    trigger('scaleIn', [
      state('void', style({ opacity: 0, transform: 'scale(0.9)' })),
      transition(':enter', [animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))])
    ])
  ]
})
export class HeroSectionComponent implements OnInit {
  currentFeatureIndex = 0;
  features = [
    { title: 'Fast Delivery', icon: 'local_shipping' },
    { title: 'Fresh Ingredients', icon: 'eco' },
    { title: 'Best Prices', icon: 'attach_money' }
  ];
  mouseX = 0;
  mouseY = 0;
  
  ngOnInit(): void {
    this.startFeatureRotation();
  }

  startFeatureRotation(): void {
    setInterval(() => {
      this.currentFeatureIndex = (this.currentFeatureIndex + 1) % this.features.length;
    }, 3000);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX / window.innerWidth - 0.5;
    this.mouseY = event.clientY / window.innerHeight - 0.5;
  }

  getParallaxStyle(): any {
    return {
      transform: `translate(${this.mouseX * -20}px, ${this.mouseY * -20}px)`
    };
  }

  getButtonAnimation(index: number): any {
    return { value: '', params: { delay: `${0.3 + (index * 0.1)}s` } };
  }
}
