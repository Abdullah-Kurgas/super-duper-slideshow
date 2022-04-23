import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateComponent } from './pages/create/create.component';
import { SlideshowComponent } from './pages/slideshow/slideshow.component';
import { SlideshowsComponent } from './pages/slideshows/slideshows.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, DashboardComponent, CreateComponent, SlideshowComponent, SlideshowsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
