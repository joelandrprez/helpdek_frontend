import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})


export class TicketGeneracionService {
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

  listarTicketUsuario(paginacion:any){
    return this.http.get(`${base_url}/ticket?inicio=${paginacion}`, this.headers)
  }

  traerProyectosFormularioRegistroTicket(){
    return this.http.get(`${base_url}/ticket/listaProyectosClientes`, this.headers)
  }

  traerprioritipo(){
    return this.http.get(`${base_url}/variable/prioridad`, this.headers)
  }

  guardarTicket(data:any){
    return this.http.post(`${base_url}/ticket`, data, this.headers)
  }
  traerPDF(data:any){
    return this.http.get(`${base_url}/proyecto/pdf/${data}`, this.headers)
  }
  AnularTicketRegistrado(uid:any){
    return this.http.put(`${base_url}/ticket/AnularTicketUsuario/${uid}`,uid, this.headers)
  }
  ActualizarTicketUsuario(data:any,uid:any){
    return this.http.put(`${base_url}/ticket/ActualizarTickerUsuario/${uid}`,data, this.headers)
  }
  BusquedaTicketUsuario(data:any,termino:any){
    return this.http.get(`${base_url}/ticket/busquedapornombre/${termino}?inicio=0`, this.headers)
  }
 
 










}
