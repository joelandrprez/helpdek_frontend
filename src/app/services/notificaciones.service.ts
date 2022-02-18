import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  public usuario?:Usuario;
  
  constructor(private http: HttpClient) { }

  get Token():string{
    return localStorage.getItem('token')||'';
  }
  get uid():string{
    return this.usuario?._id||'';
  }
  get headers(){
    return {
      headers:{
        'x-token':this.Token
      }
    }
  }

  listarNotificaciones(paginacion:any){
    return this.http.get(`${base_url}/notificaciones?inicio=${paginacion}`, this.headers)
  }
}
