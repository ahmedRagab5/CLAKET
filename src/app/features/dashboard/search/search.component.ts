import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../../core/services/search/search.service';
import { ItemsComponent } from "../../../shared/components/items/items.component";
import { MovieService } from '../../../core/services/movieService/movie.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, ItemsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private searchService:SearchService=inject(SearchService)
  private movieService:MovieService=inject(MovieService)
  items:any[]=[]
  res:any[]=[]
  srh = new FormControl('');
  type = new FormControl('movie');
  actives:boolean[]=[true,false,false,false]
  types=['movie','tv','person']
  all:boolean=true

  search(){

    console.log(this.srh.value)
    if (this.actives[0]) {
      console.log("types"+this.types)
      this.getSearch(this.types)
    }
    else{
      let nTypes:string[]=this.types.map((v,i)=>this.actives[i+1]?v:'null')
      nTypes=nTypes.filter(v=>v!='null')
      this.getSearch(nTypes)
    }


  }
  getSearch(arr:string[]){
    this.items=[]
    arr.forEach(t=>{
      if ((this.srh.value)!=null) {
      this.searchService.search(this.srh.value,t).subscribe(data=>{
        let x:any[]=data.results
        x=x.filter((i)=>i.poster_path!=null || i.profile_path!=null)
        this.items=[...this.items,...x]
        console.log(this.items)
      })
    }
    })

  }
  active(x:number){
    if (x==0) {
      this.actives= this.actives.map(e=>e=false)
      this.actives[0]=true
      this.search()
    }
    else{
      this.actives[x]=!(this.actives[x])
      this.actives[0]=false
      let all:boolean=this.actives.slice(1,).includes(false)
      if (!all) {
        this.active(0)
        return
      }
      this.search()

    }
    console.log(this.actives)

  }
  // getItem(){
  //   this.res.forEach(item => {
  //     this.movieService.
  //   });
  // }
}
