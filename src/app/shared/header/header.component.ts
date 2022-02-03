import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public usu?:any;
  public fecha?:any


  constructor(private auth:LoginService,
              private usuario:LoginService) { 
                this.usu = usuario.usuario
                moment.locale('ES'); 
                this.fecha=moment().format('LLLL')
                
                
              }

  ngOnInit(): void {
  }
  logOut(){
    this.auth.logout();
  }


}
