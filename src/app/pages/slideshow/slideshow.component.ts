import { Component, OnInit } from '@angular/core';
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

  utils = Utils

  constructor(
    private slideshowService: SlideshowService,
    private loaderService: LoaderService,
    private slideService: SlideService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.slideshowService.getSlideshow(this.route.snapshot.params['id']).subscribe({
      next: (slideshow: any) => {
        this.slideshow = slideshow;
        this.loaderService.hideFullScreenLoading();
      },
      error: (err: Error) => {
        this.loaderService.hideFullScreenLoading();
      }
    })
  }

  editSlideshow() {
    if (!this.enableEditing) {
      this.enableEditing = true;
      return
    };

    this.slideshow.isLoading = true;
    this.slideshowService.editSlideshow(this.slideshow).subscribe({
      next: (res: any) => {
        this.enableEditing = false;

        this.apiService.showToasrtMsg('success', res.msg);
        this.slideshow.isLoading = false;
      },
      error: (err: Error) => {
        this.loaderService.hideFullScreenLoading();

        this.slideshow.isLoading = false;
      }
    })
  }


  /* Slide functions */
  createSlide() {

    this.apiService.showModal('slide', this.slideshow)
      .afterClosed().subscribe((slide: Slide) => {
        if (slide) {
          this.slideService.createSlide(slide).subscribe({
            next: (res: any) => {
              slide._id = res.insertedId;
              this.slideshow.slides?.push(slide);

              this.loaderService.hideLoading();
              this.apiService.showToasrtMsg('success', res.msg);
            },
            error: (err: Error) => {
              this.loaderService.hideLoading();
            }
          })
        }
      })
  }

  editSlide(slide: Slide) {
    this.apiService.showModal('slide', slide)
      .afterClosed().subscribe((slide: Slide) => {
        if (!slide) return;

        this.slideService.editSlide(slide).subscribe({
          next: (res: any) => {

            const index = this.slideshow.slides.findIndex((el) => el._id === slide._id);
            this.slideshow.slides[index] = slide;

            this.loaderService.hideLoading();
            this.apiService.showToasrtMsg('success', res.msg);
          },
          error: (err: Error) => {
            this.loaderService.hideLoading();
          },
        })
      })

  }

  deleteSlide(slide: Slide, i: number) {
    slide.isLoading = true;

    this.slideService.deleteSlide(slide._id!).subscribe({
      next: (res: any) => {

        this.slideshow.slides?.splice(i, 1);

        slide.isLoading = false;
        this.apiService.showToasrtMsg('success', res.msg);
      },
      error: (err: Error) => {
        slide.isLoading = false;
      }
    })
  }
}
