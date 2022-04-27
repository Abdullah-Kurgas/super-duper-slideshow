import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Slide } from 'src/app/shared/models/Slide';
import { Slideshow } from 'src/app/shared/models/Slideshow';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SlideService } from 'src/app/shared/services/slide.service';
import { SlideshowService } from 'src/app/shared/services/slideshow.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  slideshow: Slideshow = new Slideshow();

  constructor(
    public modal: MatDialog,
    private slideshowService: SlideshowService,
    private loaderService: LoaderService,
    private slideService: SlideService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.slideshowService.getSlideshow(this.route.snapshot.params['id']).subscribe((slideshow: Slideshow) => {
      this.slideshow = slideshow;
      this.loaderService.hideFullScreenLoading();
    })
  }

  createSlide(type: string) {
    let newSlide = this.modal.open(ModalComponent, {
      data: {
        slideshow: this.slideshow,
        type: type
      }
    });

    newSlide.afterClosed().subscribe((slide: Slide) => {
      if (slide) {
        this.slideService.createSlide(slide).subscribe((res: any) => {
          if (res.errno) {
            this.toastr.error(res.sqlMessage);
            return;
          }

          slide.id = res.insertId;
          this.slideshow.slides?.push(slide);

          this.loaderService.hideLoading();
          this.toastr.success('Slide successfully created');
        }, err => {
          this.toastr.error(err.error.message);
          this.loaderService.hideLoading();
        })
      }
    })
  }

  editSlide(slide: Slide) {
    let editSlide = this.modal.open(ModalComponent, {
      data: {
        slide: slide,
        type: 'slide'
      }
    });

    editSlide.afterClosed().subscribe((slide: Slide) => {
      this.slideService.editSlide(slide).subscribe({
        next: (res: any) => {
          if (res.errno) {
            this.toastr.error(res.sqlMessage);
            return;
          }

          this.slideshow.slides?.forEach((el: Slide) => {
            if (el.id == slide.id) {
              el = slide;
            }
          });

          this.loaderService.hideLoading();
          this.toastr.success('Slide successfully updated');
        },
        error: (err) => {
          this.toastr.error(err.error.message);
          this.loaderService.hideLoading();
        },
      })
    })

  }

  deleteSlide(slide: Slide, i: number) {
    this.loaderService.showFullScreenLoading();

    this.slideService.deleteSlide(slide.id!).subscribe((res: any) => {
      if (res.errno) {
        this.toastr.error(res.sqlMessage);
        return;
      }

      this.slideshow.slides?.splice(i, 1);

      this.loaderService.hideFullScreenLoading();
      this.toastr.success('Slide successfully deleted');
    }, err => {
      this.toastr.error(err.error.message);
      this.loaderService.hideFullScreenLoading();
    })
  }
}
