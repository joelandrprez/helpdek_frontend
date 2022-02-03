import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

declare function customInitFunction():void;
declare function customInitHoverable():void;
declare function customInitemplate():void;
declare function customInitoffCanvas():void;





@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})


export class PagesComponent implements OnInit {

  constructor( private menuService:MenuService) { 
    customInitHoverable()
    customInitemplate()
    customInitoffCanvas();

  }

  ngOnInit(): void {
    
    customInitFunction();
    
    this.menuService.cargarMenu();
  }

}
