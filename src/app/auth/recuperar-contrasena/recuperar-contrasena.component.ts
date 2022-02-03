import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RecuperacionService } from 'src/app/services/recuperacion.service';
import { SwallService } from 'src/app/services/swall.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
  public token:any;
  public contrasenaForm = this.fb.group({

    cpaswor:['joanpeq@gmail.com',[Validators.required,Validators.email]]
  });

  constructor(private router:Router,
              private fb:FormBuilder, 
              private recuperacionServices:RecuperacionService,
              private activatedRoute:ActivatedRoute,
              public swallService:SwallService) { 
                this.activatedRoute.params.subscribe( ({id}) => {
                  this.token = id;
                })
              }

  ngOnInit(): void {
  }
  ConfirmarContrasena(){
    this.recuperacionServices.reestablecerPassword(this.token,this.contrasenaForm.value)
                            .subscribe(
                              (resp:any)=>{
                                this.router.navigateByUrl('/login')
                              },(error:any)=>{
                                this.swallService.mensajeSwal('center','error',error.error.msg,true,2000);
                              
                              }
                            )
  }

}
