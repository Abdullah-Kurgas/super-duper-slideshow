import { Target } from '@angular/compiler';
import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Slide } from 'src/app/shared/models/Slide';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SlideService } from 'src/app/shared/services/slide.service';
import Utils from 'src/app/shared/Utils';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  slides!: Slide[];
  slideNumber: number = 0;
  slideDuration!: number;

  utils = Utils;

  constructor(
    private slideService: SlideService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.slideService.getSlides(this.route.snapshot.params['id']).subscribe({
      next: (res: any) => {
        if (res.errno) {
          this.toastr.error(res.sqlMessage);
          this.loaderService.hideLoading();
          return;
        }

        this.slides = res;

        this.slideDuration = Number(this.utils.convertTime(this.slides[this.slideNumber].duration, 'seconds'));
        this.loaderService.hideFullScreenLoading();
      },
      error: (err) => {
        this.loaderService.hideFullScreenLoading();
        this.toastr.error(err.error.message);
      }
    })
  }

  changeSlide(type: string, show: any) {
    if (type == 'next') {
      if (this.slides.length - 1 == this.slideNumber) return;
      this.slideNumber++;
    } else {
      if (this.slideNumber <= 0) return;
      this.slideNumber--;
    }

    this.slideDuration = Number(this.utils.convertTime(this.slides[this.slideNumber].duration, 'seconds'));
    show.style = `margin-left:-${this.slideNumber}00vw`;
  }

}
