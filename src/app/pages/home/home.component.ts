import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { WhyUsComponent } from "../../components/why-us/why-us.component";
import { PopularDishesComponent } from "../../components/popular-dishes/popular-dishes.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeroSectionComponent, WhyUsComponent, PopularDishesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
