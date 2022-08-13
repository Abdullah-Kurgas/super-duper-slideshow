import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Slideshow } from '../models/Slideshow';

@Injectable({
  providedIn: 'root'
})
export class SlideshowService {

  constructor(private http: HttpClient) { }

  getSlideshow(uuid: string) {
    return this.http.put(environment.backendUrl + `getSlideshow`, { uuid: uuid });
  }

  getSlideshows(id: number) {
    return this.http.get(environment.backendUrl + `getSlideshows/${id}`);
  }

  createSlideshow(data: Slideshow) {
    return this.http.post(environment.backendUrl + 'createSlideshow', data);
  }

  editSlideshow(slideshow: Slideshow) {
    return this.http.put(environment.backendUrl + 'editSlideshow', slideshow);
  }

  deleteSlideshow(url: string) {
    return this.http.delete(environment.backendUrl + 'deleteSlideshow/' + url);
  }
}
