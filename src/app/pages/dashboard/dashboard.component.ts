import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router, public userService: UserService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    if (this.router.url === '/dashboard')
      this.router.navigate(['dashboard/create']);
  }

  logout() {
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData');
    } else {
      sessionStorage.removeItem('userData');
    }
    this.router.navigate(['login']);
  }

  changeRoute(route: string) {
    if (!this.router.url.includes(route)) {
      this.loaderService.showFullScreenLoading();
    }
    this.router.navigate([`dashboard/${route}`]);
  }

}
