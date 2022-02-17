import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  executeLogin() {
    this.loginService.executeLogin(this.user).subscribe((res) => {
      console.log(res);
    });
  }
}
