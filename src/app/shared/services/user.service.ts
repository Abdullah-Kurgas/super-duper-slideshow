import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import Utils from '../Utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: User = Utils.getDataFromLocalOrSession('userData');
  
  constructor(private http: HttpClient) {}

  executeLogin(user: User) {
    return this.http.put(environment.backendUrl + 'executeLogin', user);
  }

  executeSignUp(user: User) {
    return this.http.post(environment.backendUrl + 'executeSignUp', user);
  }
}
