import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Slide } from 'src/app/shared/models/Slide';
import { Slideshow } from 'src/app/shared/models/Slideshow';
import { ApiService } from 'src/app/shared/services/api.service';
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
  serverError: boolean = false;

  utils = Utils

  constructor(
    private slideshowService: SlideshowService,
    private loaderService: LoaderService,
    private slideService: SlideService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    public modal: MatDialog,
  ) { }

  ngOnInit(): void {
    this.slideshowService.getSlideshow(this.route.snapshot.params['id']).subscribe({
      next: (slideshow: any) => {
        this.slideshow = slideshow;
        this.loaderService.hideFullScreenLoading();
      },
      error: (err: Error) => {
        this.loaderService.hideFullScreenLoading();
        this.apiService.showToasrtMsg('error', err.message);
        this.serverError = true;
      }
    })
  }

  editSlideshow(type: string) {
    this.enableEditing = true;
    if (type === 'edit') return;

    this.slideshow.isLoading = true;
    this.slideshowService.editSlideshow(this.slideshow).subscribe({
      next: (res: any) => {
        this.enableEditing = false;

        this.apiService.showToasrtMsg('success', res.msg);
        this.slideshow.isLoading = false;
      },
      error: (err: Error) => {
        this.apiService.showToasrtMsg('error', err.message);

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
        this.slideService.createSlide(slide).subscribe({
          next: (res: any) => {
            if (res.errno) {
              this.apiService.showToasrtMsg('error', res.sqlMessage);
              this.loaderService.hideLoading();
              return;
            }

            slide.id = res.insertId;
            this.slideshow.slides?.push(slide);

            this.loaderService.hideLoading();
            this.apiService.showToasrtMsg('success', res.msg);
          },
          error: (err: Error) => {
            this.apiService.showToasrtMsg('error', err.message);
            this.loaderService.hideLoading();
          }
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
            this.apiService.showToasrtMsg('error', res.sqlMessage);
            this.loaderService.hideLoading();
            return;
          }

          const index = this.slideshow.slides.findIndex((el) => el.id === slide.id);
          this.slideshow.slides[index] = slide;

          this.loaderService.hideLoading();
          this.apiService.showToasrtMsg('success', res.msg);
        },
        error: (err: Error) => {
          this.apiService.showToasrtMsg('error', err.message);
          this.loaderService.hideLoading();
        },
      })
    })

  }

  deleteSlide(slide: Slide, i: number) {
    slide.isLoading = true;

    this.slideService.deleteSlide(slide.id!).subscribe({
      next: (res: any) => {
        if (res.errno) {
          this.apiService.showToasrtMsg('error', res.sqlMessage);
          slide.isLoading = false;
          return;
        }

        this.slideshow.slides?.splice(i, 1);

        slide.isLoading = false;
        this.apiService.showToasrtMsg('success', res.msg);
      },
      error: (err: Error) => {
        this.apiService.showToasrtMsg('error', err.message);
        slide.isLoading = false;
      }
    })
  }
}
