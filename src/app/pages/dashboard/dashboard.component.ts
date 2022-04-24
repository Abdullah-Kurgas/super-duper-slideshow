import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
