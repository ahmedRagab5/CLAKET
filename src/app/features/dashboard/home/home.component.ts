import { Component } from '@angular/core';
import { SliderComponent } from "./components/slider/slider.component";
import { TrendingComponent } from "./components/trending/trending.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, TrendingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
