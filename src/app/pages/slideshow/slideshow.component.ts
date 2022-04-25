import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Slideshow } from 'src/app/shared/models/Slideshow';
import { SlideshowService } from 'src/app/shared/services/slideshow.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  slideshow: Slideshow = new Slideshow();

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private slideshowService: SlideshowService) { }

  ngOnInit(): void {
    this.slideshowService.getSlideshow(this.route.snapshot.params['id']).subscribe((slideshow: Slideshow) => {
      this.slideshow = slideshow;
    })
  }

  openDialog(type: string) {
    let newSlide = this.dialog.open(ModalComponent, {
      data: {
        type: type
      }
    });

    newSlide.afterClosed().subscribe((data) => {
      

    })
  }
}
