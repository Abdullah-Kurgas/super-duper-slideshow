import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isUserMenuOpened: boolean = false;
  screenWidth: number = window.screen.availWidth;

  constructor(public router: Router, public userService: UserService, private apiService: ApiService) { }

  ngOnInit(): void {
    if (this.router.url === '/dashboard')
      this.router.navigate(['dashboard/create']);
  }

  openUserMenu(e: Event, page?: string) {
    if (page === 'close') {
      this.isUserMenuOpened = false;
    } else if (page === 'stay') {
      this.isUserMenuOpened = true;
      e.stopPropagation();
    } else {
      this.isUserMenuOpened = !this.isUserMenuOpened;
      e.stopPropagation();
    }
  }

  showProfile() {
    this.apiService.showModal('profile', this.userService.userData).afterClosed();
  }

  logout() {
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData');
    } else {
      sessionStorage.removeItem('userData');
    }
    this.router.navigate(['login']);
  }

}
