import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecuperacionService } from 'src/app/services/recuperacion.service';
import { SwallService } from 'src/app/services/swall.service';
import { environment } from 'src/environments/environment';


import Swal from 'sweetalert2';

const recuperacion_url = environment.recuperacion_url;

@Component({
  selector: 'app-enviar-correo',
  templateUrl: './enviar-correo.component.html',
  styleUrls: ['./enviar-correo.component.css']
})
export class EnviarCorreoComponent implements OnInit {

  public recuperacionForm = this.fb.group({

    ccorusu:['joanpeq@gmail.com',[Validators.required,Validators.email]]
  });

  constructor(private router:Router,
              private fb:FormBuilder, 
              private recuperacionServices:RecuperacionService,
              public swallService:SwallService,
              private ngzone:NgZone) { }

  ngOnInit(): void {
  }
  enviarCorreo(){
    const data = this.recuperacionForm.value
    data.url = recuperacion_url
    
    this.recuperacionServices.enviarCorreo(data)
                                .subscribe(
                                resp=>{
                                  this.swallService.mensajeSwal('center','success',resp.msg,false,2000);

                                  this.router.navigateByUrl(`/login`)
                                  
                                },(error)=>{
                                  
                                  this.swallService.mensajeSwal('center','error',error.msg,true,2000);
     
                                  if(error.error.msg){
                                    this.swallService.mensajeSwal('center','error',error.error.msg,true,2000);
                                  }
                                  console.log(error);
                                  
                                 
                                }
                              )
  }

}
