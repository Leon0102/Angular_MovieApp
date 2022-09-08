import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  trendingMovies: any;
  theatreMovies: any;
  popularMovies: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getTheatreMovies();
    this.getPopularMovies();
  }

  getTrendingMovies() {
    this.http.get('http://localhost:3000/trending-movies').subscribe({
      next: (res: any) => {
        this.trendingMovies = res;
        console.log(this.trendingMovies);
      }
    })
  }

  getTheatreMovies() {
    this.http.get('http://localhost:3000/threate-movies').subscribe({
      next: (res: any) => {
        this.theatreMovies = res;
        console.log(this.theatreMovies);
      }
    })
  }

  getPopularMovies() {
    this.http.get('http://localhost:3000/popular-movies').subscribe({
      next: (res: any) => {
        this.popularMovies = res;
        console.log(this.popularMovies);
      }
    })
  }

  goToMovie(type: string, id: number) {
    this.router.navigate(['/movie', type, id]);
  }
}
