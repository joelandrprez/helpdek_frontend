import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { HeaderComponent } from "../shared/header/header.component";
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { VariablesComponent } from './mantenimiento/variables/variables.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TicketsComponent } from './tickets/tickets.component';
import { NgxEditorModule } from 'ngx-editor';
import { TicketsasginadosComponent } from './ticketsasginados/ticketsasginados.component';
import { ProyectosComponent } from './proyectos/proyectos.component';

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
    ProyectosComponent
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
    ProyectosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgxEditorModule,
    
  ]
})
export class PagesModule { }
