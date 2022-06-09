import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';
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

  executeLogin() {
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

        this.apiService.showModal('serverError').afterClosed()
          .subscribe(() => {
            this.apiService.showToasrtMsg('success', 'Server has been successfully restarted');
            this.loaderService.hideLoading();
            location.reload();
          });
      }
    })
  }
}
