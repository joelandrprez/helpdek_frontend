import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  public notificaciones?:any=[]
  constructor( private notificacioneServices:NotificacionesService) { }

  ngOnInit(): void {
    this.listarNotificaciones();
  }
  listarNotificaciones(){
    this.notificacioneServices.listarNotificaciones(0)
                                .subscribe((data:any)=>{
                                  this.notificaciones = data.notificaciones
                                  console.log(data);
                                  
                                })
  }

}
