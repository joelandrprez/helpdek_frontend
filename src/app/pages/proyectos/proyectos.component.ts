
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { ProyectosService } from 'src/app/services/proyectos.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  

  public colorEstado='';
  public show='';
  public proyecto:any;

  html = '';
  editor!: Editor;

  toolbar!: Toolbar; 
  colorPresets = ['red', '#223e9c', 'rgb(255, 0, 0)'];
  public proyectos:any
  public proyectoRegistro?:FormGroup;

  constructor(private proyectoServices:ProyectosService,
              private fb:FormBuilder ) { 
    
                this.listaProyectos(0);
                this.editor = new Editor();
                this.toolbar = [
                  // default value
                  ['underline'],
                  ['ordered_list'],
                  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
                  ['text_color'],
                  ['align_left', 'align_center', 'align_right'],
                ];

  }

  ngOnInit(): void {
    this.proyectoRegistro = this.fb.group({
      cnompro:['',Validators.requiredTrue],
      ccodcli:['',Validators.requiredTrue],
      cdescri:['',Validators.requiredTrue]
    })

  }

  listaProyectos(num:any){
    this.proyectoServices.listarTProyectos(0)
                .subscribe((resp:any)=>{
                  console.log(resp.proyectos);
                  
                  this.proyectos = resp.proyectos
                })      
  }
  cerrarModal(){
    this.colorEstado='';
    this.show = '';
  }
  guardarProyecto(){

  }
  abrilModal(){
    this.proyectoRegistro?.reset();
    this.colorEstado='block';
    this.show = 'show';
  }
  registroProyecto(){

  }
  


}
