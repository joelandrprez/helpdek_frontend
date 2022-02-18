import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, delay, map, tap } from 'rxjs/operators'; // guardar en local storage
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuario?:Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngzone: NgZone,) {


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
  
  login(formData:any){
    return this.http.post(`${base_url}/login`,formData)
                    .pipe(
                          tap(  (res:any) => {
                            this.guardarLocalMenu(res.token,res.menu);
                            
                            this.usuario = res.usuario
                            
                            
                          })
                     )

  }

  guardarLocalMenu(token:string,menu:string){
    localStorage.setItem('token',token)
    localStorage.setItem('menu',JSON.stringify(menu));
  }


  validarToken(){


    const token =localStorage.getItem('token')|| '';
    return this.http.get(`${base_url}/login/usuario/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      map( (res:any) => {
        
        this.usuario = res.usuario
        // console.log(this.usuario);
        
        this.guardarLocalMenu(res.token,res.menu);
        return true;


      }),catchError(error => of(false))
    )
 

  }
  


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login')
  } 
  actualizarPerfil(){
    
  }








}
