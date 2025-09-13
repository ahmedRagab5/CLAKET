import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
    private router:Router=inject(Router)

  @Input() items: any[] = [];
  @Input() isLike: boolean = false;
  @Input() isSearch: boolean = false;
  @Input() type: string = '';
  // items:any[]=[]


  remove(id:string){
      const saved = localStorage.getItem(this.type);
      let moviesArray = saved ? JSON.parse(saved) : [];

      this.items=moviesArray.filter((item:any)=>!(item.id===id));
      localStorage.setItem(this.type, JSON.stringify(this.items));
  }
    rout(item:any){
      if (this.isSearch) {
        if (item.name && item.first_air_date) {
        this.type='tv'
      }
      else if(item.gender){
        this.type='person'
      }
      else{
        this.type='movie'
      }
      }
      var path=''
      if (this.type=="person") {
        path="/p-details"
      }
      else{
        path="/details"
      }
    this.router.navigate(
      [path, item.id],
      { queryParams: { type:  this.type} }
    );
  }
}
