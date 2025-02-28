import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface FooterSection {
  title: string;
  links: Array<{ text: string; url: string }>;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class FooterComponent implements OnInit {
  title = 'Bitez';
  currentYear = new Date().getFullYear();
  email = '';
  isSubscribing = false;
  showSuccessMessage = false;

  footerSections: FooterSection[] = [
    {
      title: 'Services',
      links: [
        { text: 'Online Order', url: '#' },
        { text: 'Pre Reservation', url: '#' },
        { text: 'Foodie Place', url: '#' },
        { text: '24/7 Service', url: '#' },
        { text: 'Super Chef', url: '#' }
      ]
    },
    // Add other sections similarly
  ];

  socialLinks = [
    { icon: 'facebook.png', url: '#', label: 'Facebook' },
    { icon: 'twitter.png', url: '#', label: 'Twitter' },
    { icon: 'instagram.png', url: '#', label: 'Instagram' }
  ];

  async handleSubscribe(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.email || this.isSubscribing) return;

    this.isSubscribing = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.showSuccessMessage = true;
      this.email = '';
      setTimeout(() => this.showSuccessMessage = false, 3000);
    } finally {
      this.isSubscribing = false;
    }
  }

  ngOnInit(): void {
    this.footerSections = [
      {
        title: 'Services',
        links: [
          { text: 'Online Order', url: '#' },
          { text: 'Pre Reservation', url: '#' },
          { text: 'Foodie Place', url: '#' },
          { text: '24/7 Service', url: '#' },
          { text: 'Super Chef', url: '#' }
        ]
      },
      {
        title: 'Quick Links',
        links: [
          { text: 'Menu', url: '#' },
          { text: 'Reviews', url: '#' },
          { text: 'Blogs', url: '#' },
          { text: 'Reserve Table', url: '#' },
          { text: 'Order Foods', url: '#' }
        ]
      },
      {
        title: 'About',
        links: [
          { text: 'Our Story', url: '#' },
          { text: 'Benefits', url: '#' },
          { text: 'Our Chefs', url: '#' }
        ]
      },
      {
        title: 'Help',
        links: [
          { text: 'Contact', url: '#' },
          { text: 'Support', url: '#' },
          { text: 'FAQ', url: '#' }
        ]
      }
    ];
  }
}
