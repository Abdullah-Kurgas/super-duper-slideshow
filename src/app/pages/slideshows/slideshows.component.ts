import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Slideshow } from 'src/app/shared/models/Slideshow';
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

  constructor(private slideshowService: SlideshowService,
    private userService: UserService,
    private loaderService: LoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.slideshowService.getSlideshows(this.userService.userData.id!).subscribe(slideshows => {
      this.slideshows = slideshows;
      this.loaderService.hideFullScreenLoading();
    })
  }

  getRemaining(date: string){
   return moment().diff(date, 'days');
  }

  deleteSlideshow(slideshow: Slideshow, i: number) {
    slideshow.isLoading = true;

    this.slideshowService.deleteSlideshow(slideshow.url).subscribe(res => {
      this.slideshows.splice(i, 1);
      this.toastr.success('Slideshow successfully deleted');
      slideshow.isLoading = false;
    }, (err) => {
      this.toastr.error(err.error.message);
      slideshow.isLoading = false;
    })
  }

}
