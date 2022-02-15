import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
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
  listarTProyectos(paginacion:any){
    return this.http.get(`${base_url}/proyecto?inicio=${paginacion}`, this.headers)
  }
  guardarProyectos(data:any){
    return this.http.post(`${base_url}/proyecto`, data, this.headers)
  }
  actualizarProyectos(uid:any,data:any){
    return this.http.put(`${base_url}/proyecto/${uid}`, data, this.headers)
  }
  listaCliente(){
    return this.http.get(`${base_url}/usuarios/clientes`, this.headers)
  }
  buscarProyecto(termino:any){
    return this.http.get(`${base_url}/proyecto/buscar?termino=${termino}`, this.headers)
  }
}
