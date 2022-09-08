import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  PutReviewOfTrendingMovie(id: number, movie: any) {
    return this.http.patch('http://localhost:3000/trending-movies/' + id, movie);
  }
}
