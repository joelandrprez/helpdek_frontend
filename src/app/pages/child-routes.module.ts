import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PermisosGuard } from '../guards/permisos.guard';
import { AsignacionticketComponent } from './asignacionticket/asignacionticket.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { VariablesComponent } from './mantenimiento/variables/variables.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketsasginadosComponent } from './ticketsasginados/ticketsasginados.component';




const ChildRute:Routes = [

    
    {path:'',component:DashboardComponent,data:{titulo:'DASHBOARD'}},
    // ACCESO
    {path:'Perfil',canActivate:[PermisosGuard],component:PerfilComponent,data:{titulo:'Perfil'}},

    //CONTROL
    {path:'Notificaciones',canActivate:[PermisosGuard],component:NotificacionesComponent,data:{titulo:'Notificaciones'}},

    //REPORTES
    {path:'Reportes',canActivate:[PermisosGuard],component:ReportesComponent,data:{titulo:'Reportes'}},

    //MANTENIMIENTO
    {path:'usuarios',canActivate:[PermisosGuard],component:UsuariosComponent,data:{titulo:'USUARIOS'}},
    {path:'variables',canActivate:[PermisosGuard],component:VariablesComponent,data:{titulo:'VARIABLES'}},
    {path:'tickets',canActivate:[PermisosGuard],component:TicketsComponent,data:{titulo:'TICKETS'}},
    {path:'proyectos',canActivate:[PermisosGuard],component:ProyectosComponent,data:{titulo:'Proyectos'}},

    //OPERACIONES
    {path:'asignacionticket',canActivate:[PermisosGuard],component:AsignacionticketComponent,data:{titulo:'tickets Asignados'}},
    

    {path:'ticketsasignados',canActivate:[PermisosGuard],component:TicketsasginadosComponent,data:{titulo:'Asignacion de Ticket'}},

    






]


@NgModule({
  imports: [RouterModule.forChild(ChildRute)],
  exports:[RouterModule]
})
export class ChildRoutesModule { }
