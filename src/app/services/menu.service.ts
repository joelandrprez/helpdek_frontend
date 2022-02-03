import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menu:any = [];
  public menube!:any;

  constructor(private http: HttpClient) { }

  get Token():string{
    return localStorage.getItem('token')||'';
  }
  get headers(){
    return {
      headers:{
        'x-token':this.Token
      }
    }
  }

  cargarMenu(){

    this.menube = localStorage.getItem('menu');
    this.menu = JSON.parse( this.menube )|| [];
    
  }
  validarIngresoMenu(){

    const url = `${base_url}/permisos/per`;
    return this.http.post(url,{},this.headers);
    
  }
  
}
