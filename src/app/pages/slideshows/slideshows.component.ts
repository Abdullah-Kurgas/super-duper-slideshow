import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Slideshow } from 'src/app/shared/models/Slideshow';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SlideshowService } from 'src/app/shared/services/slideshow.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slideshows',
  templateUrl: './slideshows.component.html',
  styleUrls: ['./slideshows.component.scss']
})
export class SlideshowsComponent implements OnInit {
  slideshows: any;
  baseUrl = environment.backendUrl;

  constructor(
    private slideshowService: SlideshowService,
    private loaderService: LoaderService,
    private userService: UserService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.slideshowService.getSlideshows(this.userService.userData.id!).subscribe({
      next: (slideshows) => {
        this.slideshows = slideshows;
        this.loaderService.hideFullScreenLoading();
      },
      error: (err: Error) => {
        this.apiService.showToasrtMsg('error', err.message);
        this.loaderService.hideFullScreenLoading();
      }
    })
  }

  getRemaining(date: string) {
    return moment().diff(date, 'days');
  }

  deleteSlideshow(slideshow: Slideshow, i: number) {
    slideshow.isLoading = true;

    this.slideshowService.deleteSlideshow(slideshow.url).subscribe({
      next: (res: any) => {
        this.slideshows.splice(i, 1);

        this.apiService.showToasrtMsg('success', res.msg);
        slideshow.isLoading = false;
      },
      error: (err: Error) => {
        this.apiService.showToasrtMsg('error', err.message);
        slideshow.isLoading = false;
      }
    })
  }

}
