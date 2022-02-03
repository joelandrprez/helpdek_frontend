import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, delay, map, tap } from 'rxjs/operators'; // guardar en local storage
import { of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})



export class PerfilService {

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

  CargarPergil(){
    const token =localStorage.getItem('token')|| '';

    return this.http.post(`${base_url}/login`,'')
                    .pipe(
                          tap(  (res:any) => {
                                                        
                          })
                     )


  }

}
