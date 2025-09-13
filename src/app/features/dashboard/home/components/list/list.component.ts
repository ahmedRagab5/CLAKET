import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, inject, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private router:Router=inject(Router)

  @Output() leftClicked = new EventEmitter<void>();
  @Output() rightClicked = new EventEmitter<void>();

  @Input() items: any[] = [];
  @Input() numMove: number = 0;
  // movies = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
  images: any[] = [];
  currentIndex = 3;
  center=5;
  intervalId: any;
  transitionEnabled = true;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    console.log(this.items)
    console.log(this.numMove)
    // دمج الصور الأصلية + أول 5 منها للنسخ
    // this.images = [...this.movies ,...this.movies,...this.movies.slice(0,5)];
    this.images = [...this.items.slice(15,),...this.items,...this.items.slice(0,5)];
    console.log(this.images)
    if (isPlatformBrowser(this.platformId)) {
      this.restartInterval()
    }
     // كل ثانية
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  nextSlide() {
    this.currentIndex+=this.numMove;
    this.transitionEnabled = true;
    this.center=(this.center+1)%29
    // لو وصلنا لآخر صورة أصلية + المكررة
     console.log(this.currentIndex)
    if (this.currentIndex >= 23) {
      setTimeout(() => {
        console.log("here")
        this.transitionEnabled = false;
        this.currentIndex = 3;
        this.center=5;
      }, 500); // نفس مدة transition
    }
  }
  previseSlide() {

    this.center=this.center>4?this.center-1:24
    this.currentIndex-=this.numMove;
    this.transitionEnabled = true;
    console.log("curent"+this.currentIndex)
    // لو وصلنا لآخر صورة أصلية + المكررة
    if (this.currentIndex <= 2) {
      // this.x=-75
      setTimeout(() => {
        this.transitionEnabled = false;
        this.currentIndex = 22;
        this.center=24
      }, 500); // نفس مدة transition
    }

  }
  restartInterval() {
    clearInterval(this.intervalId);
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 3000);
    }
  }
  left(){
    if (this.numMove==1) {
      this.rightClicked.emit();
    }
    this.previseSlide();
    this.restartInterval();
  }
  right(){
    if (this.numMove==1) {
      this.leftClicked.emit();
    }

    this.nextSlide();
    this.restartInterval();

  }
  rout(id:string){
    this.router.navigate(
      ['/details', id],
      { queryParams: { type:  'movie'} }
    );
  }

}

