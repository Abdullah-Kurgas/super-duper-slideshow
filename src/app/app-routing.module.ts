import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SlideshowComponent } from './pages/slideshow/slideshow.component';
import { SlideshowsComponent } from './pages/slideshows/slideshows.component';
import { UserAuth } from './shared/authGuards/userAuth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [UserAuth], children: [
      { path: 'create', component: CreateComponent },
      { path: 'slideshow/:id', component: SlideshowComponent },
      { path: 'slideshows', component: SlideshowsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
