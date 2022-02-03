import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {


  constructor(
    private loginServices:LoginService ,
    private router:Router
    ){

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.loginServices.validarToken().pipe(
      tap(estaAutenticado => {
        
        if(!estaAutenticado){
          this.router.navigateByUrl('/login');
        }

      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.loginServices.validarToken().pipe(
        tap(estaAutenticado => {
          
          if(!estaAutenticado){
            //agregar alerta
            this.router.navigateByUrl('/login');
          }

        })
      );
      // console.log('paso por el can Activate');
      

  }
  
}
