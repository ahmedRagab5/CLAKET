import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient) {}
  getTrendingTv() :Observable<any>{
    return this.http.get(
      'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
       { headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlODRmZTk0M2IwMjAyMjJjY2RjNWYxY2IzYjNlZCIsIm5iZiI6MTc1MzY0MDY2OS4yMzksInN1YiI6IjY4ODY2ZWRkNmQ2NzhlNzE1OWQ5YjMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx68RvTJjABU7ivP0vYDNsKdisEmf7sK-30pXMwci1w'
        }}
    );
  }
}
