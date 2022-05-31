import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Slide } from '../models/Slide';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private http: HttpClient) { }

  getSlides(id: string) {
    return this.http.get(environment.backendUrl + 'getSlides/' + id);
  }

  createSlide(slide: Slide) {
    return this.http.post(environment.backendUrl + 'createSlide', slide);
  }

  editSlide(slide: Slide) {
    return this.http.put(environment.backendUrl + 'editSlide', slide);
  }

  deleteSlide(id: number) {
    return this.http.delete(environment.backendUrl + 'deleteSlide/' + id);
  }
}
