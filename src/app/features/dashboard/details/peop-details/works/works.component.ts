import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css'
})
export class WorksComponent {
  private router:Router=inject(Router)
  @Input() works:any[]=[]
  @Input() head:string=""
  isTranse=false
  counter=0
  length=0
  isLeft=false
  isRight=true
  items:any[]=[]
  ngOnInit(){
      // this.items=this.works.filter((i)=>i.poster_path!=null)
      this.items=this.works
      // this.items=this.works.splice(0,10)
      this.length=this.works.length
  }
  left(){
    if (this.isLeft) {
      this.counter--
      if (this.counter==0) {
        this.isLeft=false

      }
      this.isRight=true
    }
  }
  right(){
    if (this.isRight) {
      this.counter++
    if (this.counter + 2==this.works.length) {
      this.isRight=false

    }
    // console.log(this.counter +"&"+this.works.length)
    this.isLeft=true

    }
  }
  route(item:any){
    var type='movie'
    if (item.name && item.first_air_date) {
      type='tv'
    }
      this.router.navigate(
      ["/details", item.id],
      { queryParams: { type:  type} }
    );
  }
}
