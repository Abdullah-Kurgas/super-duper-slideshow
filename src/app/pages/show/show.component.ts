import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Slide } from 'src/app/shared/models/Slide';
import { ApiService } from 'src/app/shared/services/api.service';
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
  duration: number = 0;
  isPlaying: boolean = true;

  utils = Utils;

  constructor(
    private slideService: SlideService,
    private loaderService: LoaderService,
    public route: ActivatedRoute,
    private apiService: ApiService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.slideService.getSlides(this.route.snapshot.params['id']).subscribe({
      next: (res: any) => {
        if (res?.errno || !res) {
          this.apiService.showToasrtMsg('error', (res?.sqlMessage || 'Internal Server Error, status 500'));
          this.loaderService.hideFullScreenLoading();
          return;
        }

        this.slides = res;

        this.slideDuration = Number(this.utils.convertTime(this.slides[this.slideNumber].duration, 'seconds'));
        this.loaderService.hideFullScreenLoading();
        this.startTimer(false, 1000);
      },
      error: (err: Error) => {
        this.loaderService.hideFullScreenLoading();
        this.apiService.showModal('serverError')
      }
    })
  }

  changeSlide(type: string) {
    if (type == 'next') {
      if (this.slides.length == this.slideNumber) return;
      this.slideNumber++;
    } else {
      if (this.slideNumber <= 0) return;
      this.slideNumber--;
    }

    if (this.slides.length !== this.slideNumber) {
      this.duration = 0;
      this.slideDuration = Number(this.utils.convertTime(this.slides[this.slideNumber].duration, 'seconds'));
    }

    this.startTimer(true, 1000);
  }

  playPause() {
    this.isPlaying = !this.isPlaying;
    this.startTimer(false, 1000);
  }

  startTimer(isClicked: boolean, seconds: number) {
    var timer = setInterval(() => {
      if (!this.isPlaying) {
        clearInterval(timer);
        return;
      };
      if (this.duration === this.slideDuration) {
        this.changeSlide('next')
        return;
      }
      this.duration++;
    }, seconds);


    if (isClicked) clearInterval(timer);
  }

}
