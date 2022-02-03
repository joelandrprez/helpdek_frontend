import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';


import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';

import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth/auth.routing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,

    //Modulos de paginas(recoerdas se debe importas las rutas como los modulos)
    PagesModule,
    AppRoutingModule,
    
    AuthModule,
    AuthRoutingModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
