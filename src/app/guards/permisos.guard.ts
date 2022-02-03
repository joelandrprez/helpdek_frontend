import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { MenuService } from '../services/menu.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {

  public valorF?:boolean;

  constructor  (private menuServices:MenuService,
                private loginServices:LoginService,
                private route:Router){

    }
    canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    const dato = route.url[0].path


    this.menuServices.validarIngresoMenu()
                      .subscribe( (datos:any) => {

                        
                        const valor = datos.menu.find( (res:any)=> res.url === dato)
                        // console.log(valor);
                        if(valor === undefined){

                          // console.log('no tiene el permiso');
                          this.valorF = false
                          this.route.navigateByUrl('/dashboard');
                        }
                        else{
                          this.valorF = true
                        }
                        
                      })
    // console.log(this.loginServices.usuario?.ccodcat);
    
    // console.log(dato); 
    if(this.valorF === true){
      return true
    }
    else{
      //agregar alerta
      this.route.navigateByUrl('/dashboard');
      return false
    }
    

    }

}
