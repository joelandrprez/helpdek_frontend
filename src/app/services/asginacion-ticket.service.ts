import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsginacionTicketService {
  public usuario?:Usuario;
  constructor(private http: HttpClient) {

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
  listaAsginacion(paginacion:any){
    return this.http.get(`${base_url}/ticket/listaAsginacion?inicio=${paginacion}`, this.headers)
  }
  actualizarTicketAsignado(data:any){
    return this.http.put(`${base_url}/ticket/${data.uid}`, data, this.headers)
  }


  listaAsginacionDesarrollo(paginacion:any){
    return this.http.get(`${base_url}/ticket/listaAsginacionDesarrollo?inicio=${paginacion}`, this.headers)
  }
  actualizarTicketAsignadoDesarrollo(data:any){
    return this.http.put(`${base_url}/ticket/desarrollo/${data.uid}`, data, this.headers)
  }
}
