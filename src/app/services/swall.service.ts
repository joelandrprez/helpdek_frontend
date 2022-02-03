import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwallService {

  constructor() { }

  mensajeSwal(_position:any,_icon:any,_title:any,_showConfirmButton:any,_timer:any){
    Swal.fire({
      position: _position,
      icon: _icon,
      title: _title,
      showConfirmButton: _showConfirmButton,
      timer: _timer
    })
  }

}
