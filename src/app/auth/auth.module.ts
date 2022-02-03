import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EnviarCorreoComponent } from './enviar-correo/enviar-correo.component';



@NgModule({
  declarations: [
    LoginComponent,
    BlankPageComponent,
    RecuperarContrasenaComponent,
    EnviarCorreoComponent
  ],
  exports:[
    LoginComponent,
    BlankPageComponent,
    RecuperarContrasenaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ]
})
export class AuthModule { }
