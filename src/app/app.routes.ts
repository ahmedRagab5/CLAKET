import { Routes } from '@angular/router';
import { HomeComponent } from './features/dashboard/home/home.component';
import { ListComponent } from './features/dashboard/home/components/list/list.component';
import { DetailsComponent } from './features/dashboard/details/details.component';
import { LikeComponent } from './features/dashboard/like/like.component';
import { MovieComponent } from './features/dashboard/movie/movie.component';
import { SearchComponent } from './features/dashboard/search/search.component';
import { PeopDetailsComponent } from './features/dashboard/details/peop-details/peop-details.component';

export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'tv',component:MovieComponent},
  {path:'movie',component:MovieComponent},
  {path:'people',component:MovieComponent},
  {path:'like',component:LikeComponent},
  {path:'search',component:SearchComponent},
  {path:'details/:id',component:DetailsComponent},
  {path:'p-details/:id',component:PeopDetailsComponent},
];
