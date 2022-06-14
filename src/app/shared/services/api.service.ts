import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private toastr: ToastrService,
    private modal: MatDialog
  ) { }

  showToasrtMsg(type: string, msg: string) {
    if (type == 'success') {
      this.toastr.success(msg);
    } else {
      this.toastr.error(msg)
    }
  }

  showModal(type: string, data?: any) {
    return this.modal.open(ModalComponent, {
      data: {
        data: data,
        type: type
      }
    })
  }
}
