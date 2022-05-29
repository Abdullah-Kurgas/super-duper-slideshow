import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
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
    private userService: UserService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaderService.hideFullScreenLoading();
    })
  }

  executeSignUp() {

    this.userService.executeSignUp(this.user).subscribe({
      next: (response) => {
        console.log(response);
        
      },
      error: () => {

      }
    }
    )
  }

}
