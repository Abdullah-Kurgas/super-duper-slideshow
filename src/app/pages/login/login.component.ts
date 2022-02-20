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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  executeLogin() {
    this.userService.executeLogin(this.user).subscribe(
      (user: User) => {
        if (!user.id) return;

        localStorage.setItem('userStored', JSON.stringify(user));

        this.router.navigate(['dashboard']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
