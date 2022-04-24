import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Slide } from 'src/app/shared/models/Slide';
import { Slideshow } from 'src/app/shared/models/Slideshow';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  slide: Slide = new Slide();
  slideshow: Slideshow = new Slideshow();

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  create(){
    if(this.data.type === 'slide'){
      this.dialogRef.close(this.slide);
    }else{
      this.dialogRef.close(this.slideshow)
    }
  }

  getImage(){

  }
}
