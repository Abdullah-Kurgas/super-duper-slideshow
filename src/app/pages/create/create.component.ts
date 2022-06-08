import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Slideshow } from 'src/app/shared/models/Slideshow';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SlideshowService } from 'src/app/shared/services/slideshow.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private slideshowService: SlideshowService,
    private userService: UserService,
    private loaderService: LoaderService,
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaderService.hideFullScreenLoading();
    }, 0)
  }

  createSlideshow() {
    this.apiService.showModal('slideshow').afterClosed().subscribe((slideshow: Slideshow) => {
      if (slideshow) {
        this.slideshowService.getUUID().subscribe({
          next: (res: any) => {
            slideshow.user_id = this.userService.userData.id;
            slideshow.url = res.uuid;

            this.slideshowService.createSlideshow(slideshow).subscribe((res: any) => {
              if (res.errno) {
                this.apiService.showToasrtMsg('error', res.sqlMessage);
                this.loaderService.hideLoading();
                return;
              }

              this.apiService.showToasrtMsg('success', res.msg);
              this.router.navigate([`dashboard/slideshow/${slideshow.url}`]);
              this.loaderService.hideLoading();
            })
          },
          error: (err: Error) => {
            this.apiService.showToasrtMsg('error', err.message);
          }
        })
      }
    })
  }
}
