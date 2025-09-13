import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MovieService } from '../../../../core/services/movieService/movie.service';
import { WorksComponent } from "./works/works.component";
import { isPlatformBrowser } from '@angular/common';
import { WaitComponent } from "../../../../shared/components/wait/wait.component";

@Component({
  selector: 'app-peop-details',
  standalone: true,
  imports: [WorksComponent, WaitComponent],
  templateUrl: './peop-details.component.html',
  styleUrl: './peop-details.component.css'
})
export class PeopDetailsComponent {
  private route:ActivatedRoute=inject(ActivatedRoute)
  private movieService:MovieService=inject(MovieService)
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  person:any={}
  cast:any[]=[]
  crew:any[]=[]
  type=''
  isLike=false
  isWait=true
  ngOnInit(){

    const id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.type=params['type']
    });
    this.movieService.getMovieDetails(id!,'person').subscribe((data)=>{
        this.person=data
        if(data){
          this.isWait=false
        }
        this.cast=data.credits.cast
        this.crew=data.credits.crew
        console.log(data)
        let saved = localStorage.getItem(this.type);
        let moviesArray = saved ? JSON.parse(saved) : [];

        moviesArray.forEach((item:any) => {
          if (item.id===this.person.id) {
            this.isLike=true;
          }
        });
    })
  }
    like(){

      this.isLike=!this.isLike
      let moviesArray=[]
      // if (isPlatformBrowser(this.platformId)) {
        const saved = localStorage.getItem(this.type);
        moviesArray = saved ? JSON.parse(saved) : [];



      if (this.isLike===true) {
        const item = {
          id: this.person.id,
          name: this.person.name,
          profile_path:this.person.profile_path
        };
        // let saved = localStorage.getItem("movies");
        // let moviesArray = saved ? JSON.parse(saved) : [];
        moviesArray.push(item);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.type, JSON.stringify(moviesArray));
          console.log("here")
        }

      }
      if (this.isLike===false) {
        moviesArray=moviesArray.filter((item:any)=>!(item.id===this.person.id));
        localStorage.setItem(this.type, JSON.stringify(moviesArray));
      }
    }
}
