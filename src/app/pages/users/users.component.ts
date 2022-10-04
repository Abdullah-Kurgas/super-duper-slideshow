import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserService } from 'src/app/shared/services/user.service';
import Utils from 'src/app/shared/Utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  baseUrl = location.origin + '/';

  utils = Utils;

  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users: any) => {
        this.users = users;
       
        this.loaderService.hideFullScreenLoading();
      },
      error: (err: Error) => {
        this.apiService.showToasrtMsg('error', err.message);
        this.loaderService.hideFullScreenLoading();
      }
    })
  }

  getRemaining(date: string) {
    return moment().diff(date, 'days');
  }

  deleteSlideshow(user: User, i: number) {
    user.isLoading = true;

    this.userService.deleteUser(user._id).subscribe({
      next: (res: any) => {
        this.users.splice(i, 1);

        this.apiService.showToasrtMsg('success', res.msg);
        user.isLoading = false;
      },
      error: (err: Error) => {
        this.apiService.showToasrtMsg('error', err.message);
        user.isLoading = false;
      }
    })
  }

}
