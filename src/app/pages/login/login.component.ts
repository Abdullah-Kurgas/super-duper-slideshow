import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserService } from 'src/app/shared/services/user.service';
import Utils from 'src/app/shared/Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = new User();

  isCheckBoxChecked: boolean = false;
  isLoading: boolean = false;
  errMessage!: string;

  constructor(
    private userService: UserService,
     private router: Router,
     public loaderService: LoaderService
     ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loaderService.hideFullScreenLoading();
    })
   }

  executeLogin() {
    this.isLoading = true;

    this.userService.executeLogin(this.user).subscribe((response: any) => {
      if (!response.id) {
        this.errMessage = response.msg;
        this.isLoading = false;
        return
      };

      if (this.isCheckBoxChecked) {
        localStorage.setItem('userData', JSON.stringify(response));
      } else {
        sessionStorage.setItem('userData', JSON.stringify(response));
      }
      this.router.navigate(['dashboard']).then(()=>{
        this.userService.userData = Utils.getDataFromLocalOrSession('userData');
        this.isLoading = false;
      });
    })
  }
}
