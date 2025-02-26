import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { WhyUsComponent } from "../../components/why-us/why-us.component";
import { PopularDishesComponent } from "../../components/popular-dishes/popular-dishes.component";
import { DiscountComponent } from '../../components/discount/discount.component';
import { CustomersSayComponent } from "../../components/customers-say/customers-say.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeroSectionComponent, WhyUsComponent, PopularDishesComponent, DiscountComponent, CustomersSayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
