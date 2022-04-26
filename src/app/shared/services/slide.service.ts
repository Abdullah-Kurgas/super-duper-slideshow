import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Slide } from '../models/Slide';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private http: HttpClient) { }

  createSlide(slide: Slide) {
    return this.http.post(environment.backendUrl + 'createSlide', slide);
  }
}
