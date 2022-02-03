import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SwallService } from 'src/app/services/swall.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  public loginForm = this.fb.group({

    ccorusu:['joanpeq@gmail.com',[Validators.required,Validators.email]],
    cpaswor:['12',[Validators.required]],
    remenber:[true]
  });

  constructor(private router:Router,
              private fb:FormBuilder, 
              private loginService:LoginService,
              private swallService:SwallService,
              private ngzone:NgZone) { }

  ngOnInit(): void {
  }

  login(){
    this.loginService.login(this.loginForm.value)
                        .subscribe(resp =>{

                          
                          this.router.navigateByUrl('/');

                          
                          
                        },(err) => {
                          const objerr:any = err.error

                          console.log(objerr);
                          if(objerr.msg){
                            this.swallService.mensajeSwal('center','error',objerr.msg,false,2000);
                          }
                          if(objerr.msg.ccorusu){
                            this.swallService.mensajeSwal('center','error',objerr.msg.ccorusu.msg,false,2000);
                          }
                          if(objerr.msg.cpaswor){
                            this.swallService.mensajeSwal('center','error',objerr.msg.cpaswor.msg,false,2000);
                          }
                          console.log(err);
                          
                         
                       });
    
  }  


}
