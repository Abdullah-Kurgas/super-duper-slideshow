import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    ) { }

  showToasrtMsg(type: string, msg: string) {
    if(type == 'success'){
      this.toastr.success(msg);
    }else{
      this.toastr.error(msg)
    }
  }

  restartServer(){
    return forkJoin([this.deleteHerokuDynos(), this.configureHerokuDynos()]);
  }

  private deleteHerokuDynos(){
   return this.http.delete('https://api.heroku.com/apps/5f2fb887-22ad-49c3-88f5-f8e4eb6a4fe2/dynos', {
     headers: {
       accept:'application/vnd.heroku+json; version=3.cedar-acm',
       authorization: 'Bearer a8df5b30-0119-43dc-aa26-c6b2d9e10253'
     }
   });
  }
  private configureHerokuDynos(){
    return this.http.get('https://backboard.heroku.com/hamurai?data=eyJzb3VyY2UiOiJkYXNoYm9hcmQiLCJldmVudCI6IkFwcCBEeW5vcyBSZXN0YXJ0ZWQiLCJ1c2VySWQiOiI4NGIyMWY3MS00ODQ1LTRkNDktOTUyOS02ODcwZmZkYzQzMDUiLCJwcm9wZXJ0aWVzIjp7InJvdXRlIjoicHJvdGVjdGVkLmFwcC5pbmRleCIsImVmZmVjdGl2ZU5ldHdvcmtUeXBlIjoiNGcifSwicGFnZSI6eyJ1cmwiOiJodHRwczovL2Rhc2hib2FyZC5oZXJva3UuY29tL2FwcHMvc3VwZXItZHVwZXItc2xpZGVzaG93LWJhY2siLCJwYXRoIjoiL2FwcHMvc3VwZXItZHVwZXItc2xpZGVzaG93LWJhY2siLCJzZWFyY2giOiIiLCJ0aXRsZSI6InN1cGVyLWR1cGVyLXNsaWRlc2hvdy1iYWNrIHwgSGVyb2t1IiwicmVmZXJyZXIiOiJodHRwczovL3ZlcmlmeS5zYWxlc2ZvcmNlLmNvbS8ifX0%3D');
  }
}
