import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Editor, Toolbar } from 'ngx-editor';
import { AsginacionTicketService } from 'src/app/services/asginacion-ticket.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-asignacionticket',
  templateUrl: './asignacionticket.component.html',
  styleUrls: ['./asignacionticket.component.css']
})
export class AsignacionticketComponent implements OnInit {

  public tickets:any = []
  public desc?:any;
  public ticketAsginacion?:FormGroup;
  public ticketFinalizar?:FormGroup;

  public detalle?:any
  public detalleF?:any
  public detalleE?:any
  // MODAL ASGINAR PROGRAMADOR
  public colorEstado='';
  public show='';
  // MODAL UPDATE
  public showUpdate='';
  public colorEstadoUpdate='';
    // MODAL FINALIZAR
    public showFin='';
    public colorEstadoFin='';

  public paginationMeta:any = { perPageItem: 0, totalItem: 0, currentPage: 0, totalPage: 0}

  public themeColor="#260F4A";

  html = '';
  editor!: Editor;
  toolbar!: Toolbar; 

  public tituloFormulario:any;

  // Lista Desarrolladores
  public desarrolladores:any=[]

  //lista Ticket General
  public ticketsTotal?:any=[]

  constructor(private asignacionServices:AsginacionTicketService,
              private sanitizer: DomSanitizer,
              private fb:FormBuilder) {
    this.listaTicketRegistrado()
    this.ListarTicketyaAsignados()
   }

  ngOnInit(): void {
    this.ticketAsginacion = this.fb.group({
      cdesasi:['',Validators.requiredTrue],
      cdesate:['',Validators.requiredTrue],
      cdiaapr:['',Validators.requiredTrue],

    })
    this.ticketFinalizar = this.fb.group({
      cdesfin:['',Validators.requiredTrue]
    })
  }
  listaTicketRegistrado(){
    this.asignacionServices.listaAsginacion(0)
                            .subscribe((resp:any)=>{
                              this.tickets = resp.data
                              
                            })
  }

  ListarTicketyaAsignados(){
    this.asignacionServices.listaGeneralTickers()
                            .subscribe((resp:any)=>{
                              console.log(resp.data);
                              console.log(resp);
                              
                              this.ticketsTotal = resp.data
                              
                            })
  }

  valirTexto(cade:any){
    this.desc = this.sanitizer.bypassSecurityTrustHtml(cade)
   
    return this.desc;
  }

  cerrarModal(tipo:string){
    if(tipo === 'asignar'){
      this.colorEstado='';
      this.show = '';
    }else if(tipo === 'detalle'){
      this.colorEstadoUpdate='';
      this.showUpdate='';
    }else if(tipo === 'terminar'){
      this.colorEstadoFin='';
      this.showFin='';
    }

  }

  guardarTicket(){

  }

  abrirModal(data:any){
    this.detalleF = data
    this.colorEstado='block';
    this.show = 'show';
    this.listaDesarrolladores();
    console.log(this.detalleF);
  }

  abrirModalDetalle(data:any){
    this.detalle = data;
    this.colorEstadoUpdate='block';
    this.showUpdate = 'show';
    console.log(this.detalle);
    
    this.listaDesarrolladores();
  }

  abrirModalFin(data:any,cadena:string){
    if(cadena==='terminar'){
      this.tituloFormulario = 'Terminar'
    }
    if(cadena==='pendiente por devolver'){
      this.tituloFormulario = 'Devolver'
    }
    this.detalleE = data
      this.colorEstadoFin='block';
      this.showFin = 'show';
      this.ticketFinalizar = this.fb.group({
        cdesfin:[this.detalleE.cdesfin,Validators.requiredTrue]
      })
      this.listaDesarrolladores();
      console.log(this.detalleE);


  }

  listaDesarrolladores(){
    this.asignacionServices.listaDesarrolladoresparaAsignar()
                           .subscribe((resp:any) =>{
                             this.desarrolladores = resp.data
                            console.log(resp);
                            
                           })
  }

  abrirLink(url: string){
    window.open(`${environment.base_url}/proyecto/pdf/${url}`, "_blank");
  }

  actualizarTicker(){

    const data = {...this.ticketAsginacion?.value}
    data.cestado ='asignado'
    data.cestdev = false

    Swal.fire({
      title: 'Esta de seguro de  derivar el Ticket?',
      text: "Despues de dar esta conformidad no se podra realizar cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignacionServices.actualizarTicketAsignadoDesarrollo(data,this.detalleF.uid)
        .subscribe((resp:any) =>{
          Swal.fire('Guardado','Se guardo los cambios','success');
          this.listaTicketRegistrado();
          this.cerrarModal('asignar');
        })
        
        Swal.fire(
          'Se derivo el Ticket!',
          'Eñ Ticket fue derivado.',
          'success'
        )
      }
    })

  }

  terminarTicket(dat:any){
    console.log(dat);

    
    const data = {...this.ticketFinalizar?.value}
    if(dat === 'Devolver'){
      data.cestado ='devuelto'
      console.log(data);
      
      Swal.fire({
        title: 'Esta Seguro de terminar el Ticket?',
        text: "Despues de dar esta conformidad no se podra realizar cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, devolver!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.asignacionServices.terminarTicket(data,this.detalleE.uid)
                                 .subscribe((resp:any)=>{
                                   console.log(resp);
                                   
                                  this.listaTicketRegistrado();
                                  this.cerrarModal('terminar')
          })
          
          Swal.fire(
            'Se concluyo el Ticket!',
            'Tu Ticket fue devolver.',
            'success'
          )
        }
      })
    }
    else if(dat==='Terminar'){
      
      data.cestado ='terminado'
      Swal.fire({
        title: 'Esta Seguro de terminar el Ticket?',
        text: "Despues de dar esta conformidad no se podra realizar cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, terminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.asignacionServices.terminarTicket(data,this.detalleE.uid)
                                 .subscribe((resp:any)=>{
                                  this.listaTicketRegistrado();
                                  this.cerrarModal('terminar')
          })
          
          Swal.fire(
            'Se concluyo el Ticket!',
            'Tu Ticket fue terminado.',
            'success'
          )
        }
      })
    }

    
    
  }

  devolverTicket(){
    const data = {...this.ticketAsginacion?.value}
    const obj:any = {}
    obj.cestado ='devuelto'
    obj.cdesfin = data.cdesate

    console.log(data);
    
    console.log(this.detalleF);

    
    if(data.cdesate.length===0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe llenar una descripcion para devolver este ticket!'
      })
    }
    else{
      Swal.fire({
        title: 'Esta Seguro de devolver este ticket?',
        text: "Despues de dar esta conformidad no se podra realizar cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, terminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.asignacionServices.terminarTicket(obj,this.detalleF.uid)
                               .subscribe((resp:any)=>{
                                 console.log(resp);
                                 
                                this.listaTicketRegistrado();
                                this.cerrarModal('asignar')
          })
          Swal.fire(
            'Se concluyo el Ticket!',
            'Tu Ticket fue devuelto.',
            'success'
          )
        }
      })
    }

  }


}
