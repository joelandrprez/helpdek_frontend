import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AuthRoutingModule } from './auth/auth.routing';
import { BlankPageComponent } from './auth/blank-page/blank-page.component';
import { PagesRoutingModule } from './pages/pages.routing';


const routes:Routes =[
 
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'**',component:BlankPageComponent}
 

]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
    

  ]
})
export class AppRoutingModule { }
