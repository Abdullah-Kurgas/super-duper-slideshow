import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SlideshowService } from 'src/app/shared/services/slideshow.service';
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
    private slideshowService: SlideshowService,
    public loaderService: LoaderService,
    private userService: UserService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaderService.hideFullScreenLoading();
    })
  }

  executeLogin(type?: string) {
    if (type) {
      this.loaderService.showLoading();
      this.loginAsQuest();
      return;
    }

    this.isLoading = true;

    this.userService.executeLogin(this.user).subscribe({
      next: (res: any) => {
        if (!res.id) {
          this.errMessage = res.msg;
          this.isLoading = false;
          return
        };

        if (this.isCheckBoxChecked) {
          localStorage.setItem('userData', JSON.stringify(res));
        } else {
          sessionStorage.setItem('userData', JSON.stringify(res));
        }
        this.router.navigate(['dashboard']).then(() => {
          this.userService.userData = Utils.getDataFromLocalOrSession('userData');
          this.isLoading = false;
        });
      },
      error: (err: Error) => {
        this.isLoading = false;
        this.apiService.showToasrtMsg('error', err.message);
      }
    })
  }

  loginAsQuest() {
    this.slideshowService.getUUID().subscribe({
      next: (res: any) => {
        this.user.username = 'quest-' + res.uuid;
        this.user.email = this.user.username + '@gmail.com';
        this.user.password = 'pass-' + res.uuid;

        this.userService.executeSignUp(this.user).subscribe({
          next: (res: any) => {
            this.user = new User();

            localStorage.setItem('userData', JSON.stringify(res));
            this.apiService.showToasrtMsg('success', 'User successfully created');
            
            this.router.navigate(['dashboard']).then(() => {
              this.userService.userData = Utils.getDataFromLocalOrSession('userData');
              this.loaderService.hideLoading();
            });
          },
          error: (err: Error) => {
            this.apiService.showToasrtMsg('error', err.message);
            this.user = new User();
            this.loaderService.hideLoading();
          }
        })
      },
      error: (err: Error) => {
        this.apiService.showToasrtMsg('error', err.message);
        this.loaderService.hideLoading();
      }
    })
  }
}


