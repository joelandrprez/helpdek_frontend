import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RecuperacionService {

  public usuario?:Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngzone: NgZone) {


               }
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
  enviarCorreo(data:any){
    return this.http.post(`${base_url}/login/generarTokenRecuperacion`,data,)
                    .pipe(
                          tap(  (res:any) => {                        
                          })
                     )
  } 
  reestablecerPassword(token:any,data:any){

    return this.http.post(`${base_url}/login/restaurarContrasena`,data,{
      headers:{
        'x-token':token
      }
    })
    .pipe(
          tap(  (res:any) => {
                 console.log(res);
                 
                                        
          })
     )
  }

}
