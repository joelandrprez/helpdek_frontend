import { Component, NgZone, OnInit } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketGeneracionService } from 'src/app/services/ticket-generacion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  public paginationMeta:any = { perPageItem: 0, totalItem: 0, currentPage: 0, totalPage: 0}

  public themeColor="#260F4A";

  html = '';
  editor!: Editor;

  toolbar!: Toolbar; 

  colorPresets = ['red', '#223e9c', 'rgb(255, 0, 0)'];

  isActive = false;
  isDisabled = false;
  public desde: number = 0;
  //modals
  public colorEstado='';
  public show='';


  public colorEstadoCancelar='';
  public showCancelar='';

  public ticketRegistro?:FormGroup;

  public desc?:any;


  public tickets:any = []
  public ticketsTemp:any = []
  public totalTicket:any   
  public paginacion!: number;

  public priori:any = []
  public tipo:any = []
  public proyectos:any=[]
  
  public archivoPDF!:File
  public archivoTemp!:any
  public detalle?:any
  


  constructor(  private fb:FormBuilder,
                private uploadService:UploadService,
                private tickeServices:TicketGeneracionService,
                private sanitizer: DomSanitizer) {

              this.editor = new Editor();
              this.toolbar = [
                // default value
                ['underline'],
                ['ordered_list'],
                [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
                ['text_color'],
                ['align_left', 'align_center', 'align_right'],
              ];

              this.listaTicketUsuario('0');
            }

  ngOnInit(): void {
    this.ticketRegistro = this.fb.group({
      ctiptic:['',Validators.requiredTrue],
      cnompro:['',Validators.requiredTrue],
      cdesasu:['',Validators.requiredTrue],
      cpriori:['',Validators.requiredTrue],
      cdescri:['',Validators.requiredTrue],
      carcadj:['',Validators.requiredTrue]
    })

    this.editor.commands
    .textColor('')
    .insertText('')
    .focus()
    .scrollIntoView()
    .exec();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  abrirModal(){
    this.ticketRegistro?.reset();
    
    this.colorEstado='block';
    this.show = 'show';

    this.tickeServices.traerprioritipo()
                      .subscribe((resp:any)=>{
                        this.priori=resp.prioridad
                        this.tipo=resp.tipo
                        this.tickeServices.traerProyectosFormularioRegistroTicket()
                        .subscribe((resp:any)=>{
                          this.proyectos= resp.data
                          
                        })
                      })

    
  }

  abrirModalCancelar(data:any){
    this.ticketRegistro?.reset();
    this.detalle = data
    console.log(this.detalle);
    
    this.colorEstadoCancelar='block';
    this.showCancelar = 'show';

    
  }
  cerrarModalCancelar(){
    this.colorEstadoCancelar='';
    this.showCancelar = '';
  }


  cerrarModal(){
    this.colorEstado='';
    this.show = '';
  }
  guardarTicketCancelado(){
    
  }

  listaTicketUsuario(number:any){
    this.tickeServices.listarTicketUsuario(number)
                        .subscribe(( resp : any) =>{
                          this.tickets = resp.data;
                          this.ticketsTemp = resp.data;
                          this.totalTicket = resp.total;

                          this.paginacion = Math.floor(-(this.totalTicket / 5)) * -1;
                          this.paginationMeta={
                            perPageItem:5,
                            totalItem: resp.total,
                            currentPage: 1, 
                            totalPage: this.paginacion
                          }
                          
                          
    })
  }
  guardarTicket(){
    const data = {
      ...this.ticketRegistro?.value
    }
    this.tickeServices.guardarTicket(data)
                      .subscribe((resp:any)=>{
                      this.uploadService.actualizarPDF(this.archivoPDF,resp.nuevoRegistro.uid)
                      Swal.fire('Guardado','La imagen se guardo','success');
                      this.cerrarModal()
                      this.listaTicketUsuario('0')
                      return resp.msg

    })
    
    
  }
  cambiarArchivo(file:any):any{
    
    this.archivoPDF = file.target.files[0];
    if(!file){
      return this.archivoTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.archivoPDF);

    reader.onloadend = () =>{
      this.archivoTemp = reader.result;
            
    }
    
  }

  valirTexto(cade:any){
    this.desc = this.sanitizer.bypassSecurityTrustHtml(cade)
   
    return this.desc;
  }


  paginationEvents(evento:any){
    this.desde = 0
    this.desde = (evento.data*5)-5;
    this.cargarTicketDes()
       
  }

  cargarTicketDes() {
    this.tickeServices.listarTicketUsuario(this.desde)
      .subscribe((resp: any) => {
        this.tickets = resp.data;
        this.ticketsTemp = resp.data;
        this.totalTicket = resp.total;
       

      })
  
  }

}
