import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User = new User();

  isLoading: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private userService: UserService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaderService.hideFullScreenLoading();
    })
  }

  executeSignUp() {
    this.userService.executeSignUp(this.user).subscribe({
      next: (res: any) => {
        this.apiService.showToasrtMsg('success', 'User successfully created');
        this.router.navigate(['login']);
      },
      error: (err: Error) => {
        this.apiService.showToasrtMsg('error', err.message);
      }
    }
    )
  }

  checkEmailValidity() {
    if (!this.user.email) return true;
    let crazyA = this.user.email.includes('@');
    let dotAfterA = this.user.email.substring(this.user.email.indexOf('@')).includes('.');
    let lastDot = this.user.email.split('').reverse().join('').substring(0, this.user.email.split('').reverse().join('').indexOf('.')).length > 1;

    if (!crazyA || !dotAfterA) return false;
    if (crazyA && dotAfterA) if (!lastDot) return false;
    return true;
  }

}
