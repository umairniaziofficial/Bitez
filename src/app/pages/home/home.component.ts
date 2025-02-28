import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { WhyUsComponent } from "../../components/why-us/why-us.component";
import { PopularDishesComponent } from "../../components/popular-dishes/popular-dishes.component";
import { DiscountComponent } from '../../components/discount/discount.component';
import { CustomersSayComponent } from "../../components/customers-say/customers-say.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { MeetOurChefComponent } from "../../components/meet-our-chef/meet-our-chef.component";
import { OurMenuComponent } from "../../components/our-menu/our-menu.component";
import { ContactUsComponent } from "../../components/contact-us/contact-us.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeroSectionComponent, WhyUsComponent, PopularDishesComponent, DiscountComponent, CustomersSayComponent, FooterComponent, MeetOurChefComponent, OurMenuComponent, ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
