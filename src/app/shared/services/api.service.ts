import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private toastr: ToastrService) { }



  showToasrtMsg(type: string, msg: string) {
    if(type == 'success'){
      this.toastr.success(msg);
    }else{
      this.toastr.error(msg)
    }
  }
}
