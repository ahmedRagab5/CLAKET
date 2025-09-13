import { Component, inject, Input, input } from '@angular/core';
import { ListComponent } from "../list/list.component";
import { MovieService } from '../../../../../core/services/movieService/movie.service';
import { List2Component } from "../list2/list2.component";
import { TvService } from '../../../../../core/services/tvService/tv.service';
import { PeopleService } from '../../../../../core/services/peopleService/people.service';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [ List2Component],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {
  title = input<string>('');
  private movieService:MovieService=inject(MovieService)
  private TvService:TvService=inject(TvService)
  private peopleService:PeopleService=inject(PeopleService)
  movies:any[]=[]
  tv:any[]=[]
  people:any[]=[]

  ngOnInit(){
    this.movieService.getTrendingMovies().subscribe((data)=>{
      this.movies=data.results
    })
    this.TvService.getTrendingTv().subscribe((data)=>{
      this.tv=data.results
    })
    this.peopleService.getTrendingPeople().subscribe((data)=>{
      this.people=data.results
      console.log(this.people + "peo")
    })
  }


}
