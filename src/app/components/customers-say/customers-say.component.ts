import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-customers-say',
  imports: [MatIcon,NgFor],
  templateUrl: './customers-say.component.html',
  styleUrl: './customers-say.component.css'
})
export class CustomersSayComponent {

  public customersData = [{
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta distinctio officia laboriosam eius
                assumenda suscipit earum neque, dolore, quibusdam voluptatibus corporis a libero aliquid unde sapiente
                architecto dolorem? Ipsa, rem! Nostrum maxime rerum id consectetur provident fugiat iste repellat
                assumenda.`,
    avatarSrc: "",
    name: "Savannah Nguyen",
    company: "Google",
    position: "CEO",
  }]
  public visibleItems = 4; 
  public mobileVisibleItems = 3; 
  public isMobile = false;
  public offset = 0;

  
  private readonly singleItemWidth = 25; 
  private readonly gapWidth = 1; 

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
    const maxOffset = -((this.customersData.length - this.visibleItems) * (this.singleItemWidth + this.gapWidth));
    if (this.offset > maxOffset) {
      
      this.offset -= (this.singleItemWidth + this.gapWidth);
      
      this.offset = Math.max(this.offset, maxOffset);
    }
  }

  previousSlide() {
    if (this.offset < 0) {
      
      this.offset += (this.singleItemWidth + this.gapWidth);
      
      this.offset = Math.min(this.offset, 0);
    }
  }

  loadMore() {
    if (this.mobileVisibleItems + 3 <= this.customersData.length) {
      this.mobileVisibleItems += 3;
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
}
