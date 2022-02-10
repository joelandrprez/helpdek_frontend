import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { NgxLightPaginationModule } from 'ngx-light-pagination'


import { TicketsasginadosComponent } from './ticketsasginados/ticketsasginados.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { TicketsComponent } from './tickets/tickets.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HeaderComponent } from "../shared/header/header.component";
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { VariablesComponent } from './mantenimiento/variables/variables.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsignacionticketComponent } from './asignacionticket/asignacionticket.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UsuariosComponent,
    VariablesComponent,
    PerfilComponent,
    HeaderComponent,
    SidebarComponent,
    TicketsComponent,
    TicketsasginadosComponent,
    ProyectosComponent,
    AsignacionticketComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    UsuariosComponent,
    VariablesComponent,
    PerfilComponent,
    HeaderComponent,
    SidebarComponent,
    TicketsComponent,
    TicketsasginadosComponent,
    ProyectosComponent,
    AsignacionticketComponent
  ],
  imports: [
    NgxLightPaginationModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgxEditorModule
    
    
  ]
})
export class PagesModule { }
