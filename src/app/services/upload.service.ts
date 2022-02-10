import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  async actualizarPDF(
    archivo :File,
    id:String
  ){

    try {
      const url = `${base_url}/upload/${id}`

      const formData = new FormData();
      formData.append('pdf',archivo);

      const rpta = await fetch(url,{
        method:'PUT',
        headers:{
          'x-token':localStorage.getItem('token')||''
        },
        body:formData
      });
      const body =  await rpta.json();

      if( body.ok ){
        return body.nombreArchivo;
      }else{
        console.log(body);
        
        return false
      }
      


      
    } catch (error) {
      console.log(error);
      return false;
      
    }

  }

}
