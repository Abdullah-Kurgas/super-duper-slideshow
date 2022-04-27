import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  isCheckBoxChecked: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  executeLogin() {
    this.userService.executeLogin(this.user).subscribe((user: any) => {
      if (!user.id) return;

      if (this.isCheckBoxChecked) {
        localStorage.setItem('userData', JSON.stringify(user));
      } else {
        sessionStorage.setItem('userData', JSON.stringify(user));
      }
      this.router.navigate(['dashboard']);
    })
  }
}
