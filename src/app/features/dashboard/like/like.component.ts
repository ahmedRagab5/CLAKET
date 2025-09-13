import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ItemsComponent } from "../../../shared/components/items/items.component";

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [ItemsComponent],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css'
})
export class LikeComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  types:string[]=['movie','tv','person']
  movies:any[][]=[]
  ngOnInit(){
    // constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
    if (isPlatformBrowser(this.platformId)) {
      for (let index = 0; index <3; index++) {
        const saved = localStorage.getItem(this.types[index]);
        this.movies[index] = saved ? JSON.parse(saved) : [];
      }
    }
  }
}
