import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  cloudinaryUrl: string = `https://api.cloudinary.com/v1_1/${environment.cloudName}/image/upload`;

  showSpinner: boolean = false;

  constructor(private http: HttpClient) { }

  uploadImage(cloudinaryData: FormData) {
    return this.http.post(this.cloudinaryUrl, cloudinaryData);
  }
}
