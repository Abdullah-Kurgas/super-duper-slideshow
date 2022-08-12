import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserAuth implements CanActivate {
  userData: User = new User();

  constructor(private router: Router) { }
  canActivate(): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData') || '{}');

    if (this.userData._id) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
