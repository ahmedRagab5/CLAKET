import { Component, Inject, inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild,AfterViewInit  } from '@angular/core';
import { MovieService } from '../../../../../core/services/movieService/movie.service';
import { SafeUrlPipe } from "../../../../../shared/pipes/safeUrl/safe-url.pipe";
import { isPlatformBrowser } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { ListComponent } from "../list/list.component";
import { WaitComponent } from "../../../../../shared/components/wait/wait.component";
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [ListComponent, WaitComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @ViewChild(ListComponent) child!: ListComponent;
  private movieService:MovieService=inject(MovieService)
  // youtubeUrl:string|null=''
  movies:any[]=[]
  isWait=true
  i:number=0
  y:number=0
  // sub!: Subscription;
intervalId: any;
x=0;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  imgs=[0,0,1,2,3,4,5]
  ngOnInit() {
    this.movieService.getTopRatedMovies().subscribe((data) => {
      this.movies = data.results;
      this.imgs[0]=this.movies.length-1
      if(data){
          this.isWait=false
      }

      if (isPlatformBrowser(this.platformId)) {
        this.restartInterval();
      }
      // imgs=[0,1,2,3,4,5,6]
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  restartInterval() {
    clearInterval(this.intervalId);
    if (isPlatformBrowser(this.platformId)) {
        this.intervalId = setInterval(() => {
          this.i = (this.i + 1) % this.movies.length;
          this.y = (this.y + 1) % 7;
          this.imgs[this.x]= (this.imgs[this.x] + 7) %(this.movies.length )

          this.x=this.x<6?this.x+1:0;
        }, 3000);

    }
  }
  getImg(i:number){
    if (this.movies.length>0) {
      return 'https://image.tmdb.org/t/p/w1280'+this.movies[i].backdrop_path
    }
    return ''
  }
  getPostImg(i:number){
    if (this.movies.length>0) {
      return 'https://image.tmdb.org/t/p/w500'+this.movies[i].poster_path
    }
    return ''
  }

  right(){
    if (this.i>0) {
      this.i=this.i - 1
    }
    else{
      this.i=this.movies.length-1
    }
    this.restartInterval()
  }
  left(){
    this.i=(this.i + 1) % this.movies.length
    this.restartInterval()

  }


}
