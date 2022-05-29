import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loaderService.hideFullScreenLoading();
    })
  }

}
