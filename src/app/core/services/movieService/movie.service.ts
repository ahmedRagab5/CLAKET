import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}
// https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1
  getTopRatedMovies():Observable<any> {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
       { headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlODRmZTk0M2IwMjAyMjJjY2RjNWYxY2IzYjNlZCIsIm5iZiI6MTc1MzY0MDY2OS4yMzksInN1YiI6IjY4ODY2ZWRkNmQ2NzhlNzE1OWQ5YjMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx68RvTJjABU7ivP0vYDNsKdisEmf7sK-30pXMwci1w'
        }}
    );
  }
  getPopularMovies(num:number,type:string):Observable<any> {
    return this.http.get(
      'https://api.themoviedb.org/3/'+type+'/popular?language=en-US&page='+num,
       { headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlODRmZTk0M2IwMjAyMjJjY2RjNWYxY2IzYjNlZCIsIm5iZiI6MTc1MzY0MDY2OS4yMzksInN1YiI6IjY4ODY2ZWRkNmQ2NzhlNzE1OWQ5YjMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx68RvTJjABU7ivP0vYDNsKdisEmf7sK-30pXMwci1w'
        }}
    );
  }
  getTrendingMovies() :Observable<any>{
    return this.http.get(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
       { headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlODRmZTk0M2IwMjAyMjJjY2RjNWYxY2IzYjNlZCIsIm5iZiI6MTc1MzY0MDY2OS4yMzksInN1YiI6IjY4ODY2ZWRkNmQ2NzhlNzE1OWQ5YjMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx68RvTJjABU7ivP0vYDNsKdisEmf7sK-30pXMwci1w'
        }}
    );
  }


    getMovieDetails(id:string,type:string) :Observable<any>{
    return this.http.get(
              // https://api.themoviedb.org/3/tv/series_id?language=en-US
      'https://api.themoviedb.org/3/'+type+'/' + id + '?language=en-US&append_to_response=credits',
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlODRmZTk0M2IwMjAyMjJjY2RjNWYxY2IzYjNlZCIsIm5iZiI6MTc1MzY0MDY2OS4yMzksInN1YiI6IjY4ODY2ZWRkNmQ2NzhlNzE1OWQ5YjMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx68RvTJjABU7ivP0vYDNsKdisEmf7sK-30pXMwci1w'
        }
      }
    );
  }
    getMovieVedio(id:string,type:string) :Observable<any>{
    return this.http.get(
      'https://api.themoviedb.org/3/'+type+'/' + id + '/videos?language=en-US',
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRlODRmZTk0M2IwMjAyMjJjY2RjNWYxY2IzYjNlZCIsIm5iZiI6MTc1MzY0MDY2OS4yMzksInN1YiI6IjY4ODY2ZWRkNmQ2NzhlNzE1OWQ5YjMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx68RvTJjABU7ivP0vYDNsKdisEmf7sK-30pXMwci1w'
        }
      }
    );
  }
}
    // 'https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US'
