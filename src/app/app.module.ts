import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateComponent } from './pages/create/create.component';
import { SlideshowComponent } from './pages/slideshow/slideshow.component';
import { SlideshowsComponent } from './pages/slideshows/slideshows.component';

// Material modules
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './components/loader/loader.component';
import { ShowComponent } from './pages/show/show.component';
import { urlSanitizerPipe } from './shared/pipes/urlSanitizer.pipe';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, DashboardComponent, CreateComponent, SlideshowComponent, SlideshowsComponent, ModalComponent, LoaderComponent, ShowComponent, urlSanitizerPipe],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    YouTubePlayerModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 1500
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
