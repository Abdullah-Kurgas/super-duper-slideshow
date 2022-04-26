import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isFullScreenLoading: boolean = true;
  isLoading: boolean = false;

  constructor() { }

  showFullScreenLoading(){
    this.isFullScreenLoading = true;
  }

  hideFullScreenLoading(){
    this.isFullScreenLoading = false;
  }

  showLoading(){
    this.isLoading = true;
  }

  hideLoading(){
    this.isLoading = false;
  }
}
