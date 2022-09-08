import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  reviewForm!: FormGroup;
  type = '';
  id = '';
  url = '';
  currentRate = 0;
  movie!: any;

  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      rating: ['', Validators.required],
      review: ['', Validators.required],
    });


    this.type = this.router.snapshot.paramMap.get('type')!;
    this.id = this.router.snapshot.paramMap.get('id')!;
    if (this.type === 'trending') {
      this.url = 'http://localhost:3000/trending-movies/' + this.id;
    }
    if (this.type === 'theatre') {
      this.url = 'http://localhost:3000/threate-movies/' + this.id;
    }
    if (this.type === 'popular') {
      this.url = 'http://localhost:3000/popular-movies/' + this.id;
    }
    this.getMovie();
  }

  getMovie() {
    this.http.get(this.url).subscribe({
      next: (res: any) => {
        this.movie = res;
      }
    })
  }

  rateTheMovie(rating: any) {
    // console.log('rate the movie', rating, this.router.params.subscribe(params => {
    //   return params['id'];
    // }));
  }

  putReview() {
    const review = {
      author: this.reviewForm.value.name,
      rating: this.reviewForm.value.rating / 2,
      review: this.reviewForm.value.review,
      published_on: new Date(),
    }
    this.movie.reviews.push(review);
    return this.router.params.subscribe(params => {
      this.reviewService.PutReviewOfTrendingMovie(params['id'], this.movie).subscribe({
        next: (res: any) => {
          console.log('review added', res);
        }
      })
    }
    )
  }
}
