
import { Component, OnInit ,AfterViewInit,AfterContentInit,DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Editor, Toolbar } from 'ngx-editor';
import { delay } from 'rxjs/operators';
import { ProyectosService } from 'src/app/services/proyectos.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  public paginationMeta:any = { perPageItem: 0, totalItem: 0, currentPage: 0, totalPage: 0}
  public desde: number = 0;
  public themeColor="#260F4A";

  public colorEstado='';
  public show='';
  public proyecto?:any;

  public proyectos:any = []
  public ProyectoTemp:any = []
  public totalProyectos:any   
  public paginacion!: number;

  public lstUsu:any;


  // Editor
  html = '';
  colorPresets = ['red', '#223e9c', 'rgb(255, 0, 0)'];

  editorR?: Editor;
  toolbarR?: Toolbar; 



  public desc?:any;

  public proyectoRegistro?:FormGroup;
  public proyectoUpdate?:FormGroup;


  // abrir modal update
  public colorEstadoUpdate='';
  public showUpdate='';
  public valircli?:string;

  // actualizar registro Proyecto
  public proUpdate?:any;



  constructor(private proyectoServices:ProyectosService,
              private fb:FormBuilder,
              private sanitizer: DomSanitizer ) { 
    
                this.listaProyectos(0);
                
  }

  ngOnInit(): void {
    this.proyectoRegistro = this.fb.group({
      cnompro:['',Validators.requiredTrue],
      ccodcli:['',Validators.requiredTrue],
      cdescri:['',Validators.requiredTrue],
      cestado:['',Validators.requiredTrue],
    })

  }


  listaProyectos(num:any){
    this.proyectoServices.listarTProyectos(0)
                .subscribe((resp:any)=>{
                  console.log(resp.proyectos);
                  this.totalProyectos = resp.total
                  this.proyectos = resp.proyectos

                  this.paginacion = Math.floor(-(this.totalProyectos / 5)) * -1;
                  this.paginationMeta={
                    perPageItem:5,
                    totalItem: resp.total,
                    currentPage: 1, 
                    totalPage: this.paginacion
                  }
                  
                }),delay(300)      
  }
  // abrir modal registro y actualizar
  cerrarModal(con:any){
    
      this.colorEstado='';  
      this.show = ''   ; 
    

  }

  abrilModal(con:any,proyecto?:any){
  
      this.listarCliente();
      
      this.proyectoRegistro?.reset();

        this.colorEstado='block';
        this.show = 'show';

  }

  // Guardar los registros de proyectos
  registroProyecto(){
    
        const data = { ...this.proyectoRegistro?.value }
        console.log(data);
        
        this.proyectoServices.guardarProyectos(data)
                             .subscribe((resp:any)=>{
                              Swal.fire('Guardado','se guardo Correctamente','success');
                              this.cerrarModal('registrar')
                             })
        this.listaProyectos(0);



  }
 // fin guardar los registros de proyectos

  // paginacion
  paginationEvents(evento:any){
    this.desde = 0
    this.desde = (evento.data*5)-5;
    this.cargarProyectosDes();
       
  }
  cargarProyectosDes() {
    this.proyectoServices.listarTProyectos(this.desde)
      .subscribe((resp: any) => {
            this.totalProyectos = resp.total
            this.proyectos = resp.proyectos

      })
  
  }
  // fin paginacion

  // validacion de texto que se visualiza en la lista
  valirTexto(cade:any){
    this.desc = this.sanitizer.bypassSecurityTrustHtml(cade)
   
    return this.desc;
  }
  // fin validacion de texto que se visualiza en la lista
  listarCliente(){
    this.proyectoServices.listaCliente()
                        .subscribe((resp:any)=>{
                          this.lstUsu = resp.usuarios
                        })
  }

  abrilModalUpdate(proyecto?:any){
      this.colorEstadoUpdate='block';
      this.showUpdate = 'show';

      this.proUpdate = proyecto
      this.proyectoRegistro = this.fb.group({
        cnompro:[proyecto.cnompro,Validators.requiredTrue],
        ccodcli:[proyecto.ccodcli._id,Validators.requiredTrue],
        cdescri:[proyecto.cdescri,Validators.requiredTrue],
        cestado:[proyecto.cestado,Validators.requiredTrue]
      })
      this.listarCliente();   
      
      

  }
  cerrarModalUpdate(){
    this.colorEstadoUpdate='';  
    this.showUpdate = ''   ; 
  }
  actualizarProyecto(){
    const data = { ...this.proyectoRegistro?.value }
    if( data.cestado === "true"){
      data.cestado = true
    }else if (data.cestado === "false"){
      data.cestado = false
    }
    console.log(this.proUpdate.uid);
    data.uid = this.proUpdate.uid
    this.proyectoServices.actualizarProyectos(data.uid,data)
                         .subscribe((resp:any)=>{
                          Swal.fire('Guardado','se guardo Correctamente','success');
                          this.cerrarModalUpdate();
                          this.listaProyectos(0);  
                         })
     
  }
  formatear(valor:any){
    if(valor==='true'){
      return 'true'
    }else if(valor==='false'){
      return 'false'
    }
    else{
      return ''
    }
  
  }
  

}
