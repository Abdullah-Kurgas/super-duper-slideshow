import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: User = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData') || '{}')
  
  constructor(private http: HttpClient) {}

  executeLogin(user: User) {
    return this.http.put(environment.backendUrl + 'executeLogin', user);
  }
}
