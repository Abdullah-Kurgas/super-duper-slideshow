import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Slideshow } from '../models/Slideshow';

@Injectable({
  providedIn: 'root'
})
export class SlideshowService {

  constructor(private http: HttpClient) { }

  getUUID() {
    return this.http.get(environment.backendUrl + 'getUuid');
  }

  getSlideshow(id: number){
    return this.http.get(environment.backendUrl + `getSlideshow/${id}`);
  }

  createSlideshow(data: Slideshow) {
    return this.http.post(environment.backendUrl + 'createSlideshow', data);
  }
}
