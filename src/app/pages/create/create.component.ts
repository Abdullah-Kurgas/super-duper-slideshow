import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/components/modal/modal.component';
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

  constructor(public dialog: MatDialog,
    private slideshowService: SlideshowService,
    private userService: UserService,
    private loaderService: LoaderService,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loaderService.hideFullScreenLoading();
    }, 0)
  }

  createSlideshow(type: string) {
    let slideshowModal = this.dialog.open(ModalComponent, {
      data: {
        type: type
      }
    });

    slideshowModal.afterClosed().subscribe((slideshow: Slideshow) => {
      if (slideshow) {
        this.slideshowService.getUUID().subscribe((res: any) => {
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
        }, err => {
          this.apiService.showToasrtMsg('error', err.error.message);
        })
      }

    })
  }
}
