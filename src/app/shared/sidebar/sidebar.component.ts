import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(public menuService:MenuService,
              private auth:LoginService) {

 
    
      
   }

  ngOnInit(): void {
  }
  logOut(){
    this.auth.logout();
  }
}
