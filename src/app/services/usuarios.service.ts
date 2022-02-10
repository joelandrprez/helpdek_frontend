import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  public usuario?:Usuario;
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
  listarUsuarios(paginacion:any){
    return this.http.get(`${base_url}/usuarios?inicio=${paginacion}`, this.headers)
  }
  guardarUsuario(data:any){
    return this.http.post(`${base_url}/usuarios`, data, this.headers)
  }



}
