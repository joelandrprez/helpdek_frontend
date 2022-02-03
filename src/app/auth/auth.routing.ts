import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { EnviarCorreoComponent } from './enviar-correo/enviar-correo.component';
import { LoginComponent } from './login/login.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';



const routes:Routes = [
    {path:'login',component:LoginComponent},
    {path:'blankpage',component:BlankPageComponent},
    {path:'recuperarContrasena/:id',component:RecuperarContrasenaComponent},
    {path:'recuperacion',component:EnviarCorreoComponent}

]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AuthRoutingModule { }
