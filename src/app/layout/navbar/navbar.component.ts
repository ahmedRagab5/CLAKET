import { Component, ElementRef, HostListener, ViewChild ,Renderer2, inject  } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MovieService } from '../../core/services/movieService/movie.service';
import { SearchService } from '../../core/services/search/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @ViewChild('menu') menu!: ElementRef;
  active:number=1;
  items:any[]=[]
  open:boolean=false;


  constructor(private renderer: Renderer2) {}


  openMenu(){
    if (this.open)
      this.renderer.setStyle(this.menu.nativeElement, 'display', 'none');
    else
      this.renderer.setStyle(this.menu.nativeElement, 'display', 'block');

    this.open=!this.open
  }


}
