import { Component, inject } from '@angular/core';
import { MovieService } from '../../../core/services/movieService/movie.service';
import { ItemsComponent } from "../../../shared/components/items/items.component";
import { ActivatedRoute, Router } from '@angular/router';
import { WaitComponent } from "../../../shared/components/wait/wait.component";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [ItemsComponent, WaitComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  private movieService:MovieService=inject(MovieService)
  private router:Router=inject(Router)
  private route:ActivatedRoute=inject(ActivatedRoute)
  movies:any[]=[]
  num:number=0
  type:string=''
  isWait=true
  ngOnInit(){

    this.route.queryParams.subscribe(params => {
      this.type=params['type']
    });
    this.more()
  }


  more(){
    let moreMovies:any[]=[]
    this.movieService.getPopularMovies(++this.num,this.type).subscribe(data=>{
      moreMovies=data.results
      if(data){
          this.isWait=false
      }
      moreMovies=moreMovies.filter((i)=>i.poster_path!=null || i.profile_path!=null)

      this.movies=[...this.movies,...moreMovies]
    })

    // console.log(moreMovies)
  }
}
