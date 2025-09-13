import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, inject, Inject, input, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-list2',
  standalone: true,
  imports: [SlickCarouselModule],
  templateUrl: './list2.component.html',
  styleUrl: './list2.component.css'
})
export class List2Component {
  private router:Router=inject(Router)

  // title = input<string>('');

  @Input() items: any[] = [];
  @Input() numMove: number = 0;
  @Input() numShow:number=0;
  @Input() arrowType:number=0;
  @Input() type:string='';
  @Input() title:string='';
  @Input() isTrend:boolean=false;
  // newItems=this.items.filter((i)=>i.poster_path!=null || i.profile_path!=null)
  // movies = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
  movies: any[] = [];
  currentIndex = 0;
  header:string=''
  // center=5;
  intervalId: any;
  transitionEnabled = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  // @ViewChild(SlickCarouselComponent) slickModal!: SlickCarouselComponent;
  ngOnInit(): void {
    if (this.isTrend) {
      this.header=`Trending ${this.title}`
    }
    else{
      this.header=this.title
    }
    this.items=this.items.filter((i)=>i.poster_path!=null || i.profile_path!=null)
    while (this.items.length%this.numMove!=0) {
      this.numMove--;
    }
    while (this.items.length<=this.numShow) {
      this.numShow--;
    }
    this.currentIndex = this.numShow;
    this.movies = [...this.items.slice(-this.numShow,),...this.items,...this.items.slice(0,this.numShow)];

    if (isPlatformBrowser(this.platformId)&&this.items.length>4) {
      this.restartInterval()
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  nextSlide() {
    this.currentIndex+=this.numMove;
    this.transitionEnabled = true;
    console.log("itemst"+this.items.length)
    console.log(this.currentIndex)
    if (this.currentIndex > this.items.length + (this.numShow-1)) {
      setTimeout(() => {
        console.log("here")
        this.transitionEnabled = false;
        this.currentIndex = this.numShow;
        // this.center=5;
      }, 500); // نفس مدة transition
    }
  }
  previseSlide() {

    // this.center=this.center>4?this.center-1:24
    this.currentIndex-=this.numMove;
    this.transitionEnabled = true;
    console.log("curent"+this.currentIndex)
    // لو وصلنا لآخر صورة أصلية + المكررة
    if (this.currentIndex <= (this.numShow%this.numMove)) {
      // this.x=-75
      setTimeout(() => {
        this.transitionEnabled = false;
        this.currentIndex = this.items.length + (this.numShow%this.numMove);
        // this.center=24
      }, 500); // نفس مدة transition
    }

  }
  restartInterval() {
    clearInterval(this.intervalId);
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }
  left(){
    this.previseSlide();
    this.restartInterval();
  }
  right(){
    this.nextSlide();
    this.restartInterval();

  }

  rout(id:string){
    var path=''
    if (this.type==='person') {
      path='/p-details'
    }
    else{
      path='/details'
    }
    this.router.navigate(
      [path, id],
      { queryParams: { type:  this.type} }
    );
  }

//   slideConfig = {
//   slidesToShow: 5,       // عدد الشرائح المعروضة في نفس الوقت
//   slidesToScroll: 4,     // كم شريحة تتحرك مع كل تمرير
//   autoplay: true,        // التشغيل التلقائي
//   autoplaySpeed: 5000,   // المدة بين كل تمريرة (ms)
//   pauseOnHover: false,   // هل يتوقف التشغيل التلقائي عند المرور بالماوس؟
//   infinite: true,        // الدوران اللانهائي
//   responsive: [          // إعدادات حسب حجم الشاشة
//     {
//       breakpoint: 922,   // لو العرض أقل من 922px
//       settings: {
//         arrows: true,
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 3
//       }
//     },
//     {
//       breakpoint: 768,   // لو العرض أقل من 768px
//       settings: {
//         arrows: true,
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//   ]
// };


}

