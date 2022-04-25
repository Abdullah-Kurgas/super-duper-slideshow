import { Component, OnInit } from '@angular/core';
import { SlideshowService } from 'src/app/shared/services/slideshow.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-slideshows',
  templateUrl: './slideshows.component.html',
  styleUrls: ['./slideshows.component.scss']
})
export class SlideshowsComponent implements OnInit {
  slideshows: any;
  baseUrl = environment.backendUrl;

  constructor(private slideshowService: SlideshowService, private userService: UserService) { }

  ngOnInit(): void {
    this.slideshowService.getSlideshows(this.userService.userData.id!).subscribe(slideshows => {
      this.slideshows = slideshows;
    })
  }

}
