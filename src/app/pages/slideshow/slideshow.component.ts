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
import Utils from 'src/app/shared/Utils';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  slideshow: Slideshow = new Slideshow();

  enableEditing: boolean = false;

  utils = Utils

  constructor(
    public modal: MatDialog,
    private slideshowService: SlideshowService,
    private loaderService: LoaderService,
    private slideService: SlideService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.slideshowService.getSlideshow(this.route.snapshot.params['id']).subscribe((slideshow: any) => {
      this.slideshow = slideshow;
      this.loaderService.hideFullScreenLoading();
    })
  }

  editSlideshow(type: string) {
    this.enableEditing = true;
    if (type === 'edit') return;

    this.slideshow.isLoading = true;
    this.slideshowService.editSlideshow(this.slideshow).subscribe({
      next: (res) => {
        this.enableEditing = false;

        this.toastr.success('Slideshow successfully edited');
        this.slideshow.isLoading = false;
      },
      error: (err) => {
        this.toastr.error(err.error.message);
        this.slideshow.isLoading = false;
      }
    })
  }


  /* Slide functions */
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
            this.loaderService.hideLoading();
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
      if (!slide) return;

      this.slideService.editSlide(slide).subscribe({
        next: (res: any) => {
          if (res.errno) {
            this.toastr.error(res.sqlMessage);
            this.loaderService.hideLoading();
            return;
          }

          const index = this.slideshow.slides.findIndex((el) => el.id === slide.id);
          this.slideshow.slides[index] = slide;

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
    slide.isLoading = true;

    this.slideService.deleteSlide(slide.id!).subscribe((res: any) => {
      if (res.errno) {
        this.toastr.error(res.sqlMessage);
        slide.isLoading = false;
        return;
      }

      this.slideshow.slides?.splice(i, 1);

      slide.isLoading = false;
      this.toastr.success('Slide successfully deleted');
    }, err => {
      this.toastr.error(err.error.message);
      slide.isLoading = false;
    })
  }
}
