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
  //modals registro
  public colorEstado='';
  public show='';
  //modals detalle
  public colorEstadoDetalle='';
  public showDetalle='';
  //modals actualizar
  public colorEstadoUpdate='';
  public showUpdate='';



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
  
  // desabilitar
  public utDisabled:any;


  constructor(  private fb:FormBuilder,
                private uploadService:UploadService,
                private tickeServices:TicketGeneracionService,
                private sanitizer: DomSanitizer) {


              this.listaTicketUsuario('0');
            }

  ngOnInit(): void {
    this.utDisabled = null;
    this.ticketRegistro = this.fb.group({
      ctiptic:['',Validators.requiredTrue],
      cnompro:['',Validators.requiredTrue],
      cdesasu:['',Validators.requiredTrue],
      cpriori:['',Validators.requiredTrue],
      cdescri:['',Validators.requiredTrue],
      carcadj:['',Validators.requiredTrue]
    })


  }

  abrirModalregistro(){
    
    this.colorEstado='block';
    this.show = 'show';
    this.ticketRegistro?.reset();
    this.prioridad();
    
  }
  prioridad(){
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

  abrirModalDetalle(data:any){
    this.ticketRegistro?.reset();
    this.detalle = data
    this.colorEstadoDetalle='block';
    this.showDetalle = 'show';
  }
  abrirModalUpdate(data:any){
    this.detalle = data
    
    this.ticketRegistro = this.fb.group({
      ctiptic:[data.ctiptic._id,Validators.requiredTrue],
      cnompro:[data.cnompro._id,Validators.requiredTrue],
      cdesasu:[data.cdesasu,Validators.requiredTrue],
      cpriori:[data.cpriori._id,Validators.requiredTrue],
      cdescri:[data.cdescri,Validators.requiredTrue],
    })
    this.prioridad();
    this.colorEstadoUpdate='block';
    this.showUpdate = 'show';
  }

  cerrarModal(tipo:string){
    if(tipo === 'registro'){
      this.colorEstado='';
      this.show = '';
    }else if(tipo === 'detalle'){
      this.colorEstadoDetalle='';
      this.showDetalle = '';
    }else if(tipo === 'update'){
      this.colorEstadoUpdate='';
      this.showUpdate='';
    }

  }

  listaTicketUsuario(number:any){
    this.tickeServices.listarTicketUsuario(number)
                        .subscribe(( resp : any) =>{
                          this.tickets = resp.data;
                          console.log(this.tickets);
                          
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
  BuquedaTicket(termino:string){
    if(termino.length === 0){
      this.tickets = this.ticketsTemp;
      console.log(this.ticketsTemp);
      console.log(this.tickets);

      
      return ;
    }
    this.tickeServices.BusquedaTicketUsuario(termino,termino)
                      .subscribe(( resp : any) =>{
                        this.tickets = resp.data;
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
                      Swal.fire('Guardado','Se guardaron los cambios','success');
                      this.cerrarModal('registro')
                      this.listaTicketUsuario('0')
                      return resp.msg

    })
    
    
  }
  actualziarTicket(){
    const data = {
      ...this.ticketRegistro?.value
    }
    console.log(this.detalle);
    
    this.tickeServices.ActualizarTicketUsuario(data,this.detalle.uid)
                      .subscribe((resp:any)=>{
                        console.log(resp);
                        this.tickets = resp.data;
                        console.log(this.tickets);
                        
                        this.ticketsTemp = resp.data;
                        this.totalTicket = resp.total;

                        this.paginacion = Math.floor(-(this.totalTicket / 5)) * -1;
                        this.paginationMeta={
                          perPageItem:5,
                          totalItem: resp.total,
                          currentPage: 1, 
                          totalPage: this.paginacion
                        }
                      this.uploadService.actualizarPDF(this.archivoPDF,this.detalle.uid)
                      Swal.fire('Guardado','Se guardaron los cambios','success');
                      this.cerrarModal('update')
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
  abrirLink(url: string){
    window.open(`http://localhost:3000/api/proyecto/pdf/${url}`, "_blank");
  }
  anularTicket(data:any){
    
    const { uid } = data
    Swal.fire({
      title: 'Esta seguro de anular este Ticket?',
      showDenyButton: true,
      confirmButtonText: 'Anular',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tickeServices.AnularTicketRegistrado(uid)
                          .subscribe((resp:any)=>{
                            this.listaTicketUsuario(0)
                            console.log(resp);                            
                          })
        Swal.fire('Se anulo el Ticket!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se guardaron los cambios', '', 'info')
      }
    })
  }


}
