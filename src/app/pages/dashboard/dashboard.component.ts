import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData: User = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData') || '{}')

  constructor(public router: Router) { }

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

}
