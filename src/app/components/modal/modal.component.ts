import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Slide } from 'src/app/shared/models/Slide';
import { Slideshow } from 'src/app/shared/models/Slideshow';
import { Videos } from 'src/app/shared/models/Video';
import { ImageService } from 'src/app/shared/services/image.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { VideoService } from 'src/app/shared/services/video.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  slide: Slide = new Slide();
  slideshow: Slideshow = new Slideshow();

  image!: File;
  uploadedImage: any;

  constructor(
    public modal: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageService: ImageService,
    private loaderService: LoaderService,
    private videoService: VideoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.data?.slide ? this.slide = this.data?.slide : null;
  }

  createSlide() {
    this.loaderService.showLoading();
    if (this.data.type === 'slideshow') return this.modal.close(this.slideshow);

    if (!this.slide.id) {
      this.slide.slideshow_id = this.data.slideshow.url;
    }

    if (this.image) {
      this.getImage().subscribe((imgData: any) => {
        this.slide.image = imgData.url;

        this.modal.close(this.slide);
      });
      return;
    }

    if (this.slide.video_url) {
      this.getVideo().subscribe({
        next: (videos: Videos) => {
          this.slide.image = videos.items![0].snippet.thumbnails.standard.url;

          this.modal.close(this.slide);
        },
        error: (err: any) => {
          this.toastr.error(err.error.message);
          this.loaderService.hideLoading();
        }
      });
      return;
    }

    this.modal.close(this.slide);
  }

  uploadImage(e: any) {
    this.image = e.target.files[0];

    if (this.image) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.uploadedImage = reader.result;
      };
    }
    this.uploadedImage = undefined;
  }

  getImage() {
    let formData = new FormData();
    formData.append('file', this.image);
    formData.append('upload_preset', environment.uploadPreset);

    return this.imageService.uploadImage(formData);
  }

  getVideo() {
    let videoId = this.slide.video_url?.
      substring(this.slide.video_url.indexOf('v=') + 2, this.slide.video_url.indexOf('&'));

    return this.videoService.getVideoById(videoId!);
  }

}
