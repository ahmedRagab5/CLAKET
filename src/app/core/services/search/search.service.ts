import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

 constructor(private http: HttpClient) {}

    searchByKeyword(query:string):Observable<any> {
      return this.http.get(
        'https://api.themoviedb.org/3/search/keyword?query='+query+'&page=1',
        { headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlODRmZTk0M2IwMjAyMjJjY2RjNWYxY2IzYjNlZCIsIm5iZiI6MTc1MzY0MDY2OS4yMzksInN1YiI6IjY4ODY2ZWRkNmQ2NzhlNzE1OWQ5YjMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx68RvTJjABU7ivP0vYDNsKdisEmf7sK-30pXMwci1w'
          }}
      );
    }
    search(query:string,type:string):Observable<any> {
      return this.http.get(
        'https://api.themoviedb.org/3/search/'+type+'?query='+query+'&include_adult=false&language=en-US&page=1',
        { headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlODRmZTk0M2IwMjAyMjJjY2RjNWYxY2IzYjNlZCIsIm5iZiI6MTc1MzY0MDY2OS4yMzksInN1YiI6IjY4ODY2ZWRkNmQ2NzhlNzE1OWQ5YjMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx68RvTJjABU7ivP0vYDNsKdisEmf7sK-30pXMwci1w'
          }}
      );
    }
   
}
