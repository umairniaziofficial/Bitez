import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { HeroSectionComponent } from "../../components/shared/hero-section/hero-section.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
