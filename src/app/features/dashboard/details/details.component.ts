import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../core/services/movieService/movie.service';
import { List2Component } from "../home/components/list2/list2.component";
import ISO6391 from "iso-639-1";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SafeUrlPipe } from '../../../shared/pipes/safeUrl/safe-url.pipe';
import { WaitComponent } from "../../../shared/components/wait/wait.component";
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [List2Component, CommonModule, SafeUrlPipe, WaitComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  private route:ActivatedRoute=inject(ActivatedRoute)
  private movieService:MovieService=inject(MovieService)
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  movie:any={}
  cast:any[]=[]
  crew:any[]=[]
  img:string=''
  isLike=false
  isWait=true
  lang:string=''
  type:string=''
  vUrl:string=''
  url:string=''
  video:boolean=false
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.type=params['type']
    });
    console.log(this.type);
      this.movieService.getMovieDetails(id!,this.type).subscribe((data)=>{
        console.log(data)

        this.movie=data
        if(this.movie){
          this.isWait=false
        }
        if (isPlatformBrowser(this.platformId)) {
          let saved = localStorage.getItem(this.type);
          let moviesArray = saved ? JSON.parse(saved) : [];

          moviesArray.forEach((item:any) => {
            if (item.id===this.movie.id) {
              this.isLike=true;
            }
          });
        }
        this.img='https://image.tmdb.org/t/p/w500'+(data.backdrop_path||data.profile_path)
        this.cast=this.movie.credits.cast
        this.crew=this.movie.credits.crew
        this.lang=ISO6391.getName(this.movie.original_language)
      })
      this.movieService.getMovieVedio(id!,this.type).subscribe(data=>{
        console.log(data.results)
        console.log(data.results.find((v: any) => v.type === "Trailer" && v.site === "YouTube"))
        const res=data.results.find((v: any) => v.type === "Trailer" && v.site === "YouTube")
        this.vUrl='https://www.youtube.com/embed/' + res.key
      })


  }

  like(){

    this.isLike=!this.isLike
    let moviesArray=[]
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.type);
      moviesArray = saved ? JSON.parse(saved) : [];
    }


    if (this.isLike===true) {
      const item = {
        id: this.movie.id,
        original_title: this.movie.original_title,
        poster_path:this.movie.poster_path
      };
      // let saved = localStorage.getItem("movies");
      // let moviesArray = saved ? JSON.parse(saved) : [];

      moviesArray.push(item);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.type, JSON.stringify(moviesArray));
      }

    }
    if (this.isLike===false) {
      moviesArray=moviesArray.filter((item:any)=>!(item.id===this.movie.id));
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.type, JSON.stringify(moviesArray));
      }
    }
  }

}
