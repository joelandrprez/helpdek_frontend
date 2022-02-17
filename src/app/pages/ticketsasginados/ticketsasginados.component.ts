import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Editor, Toolbar } from 'ngx-editor';
import { AsginacionTicketService } from 'src/app/services/asginacion-ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticketsasginados',
  templateUrl: './ticketsasginados.component.html',
  styleUrls: ['./ticketsasginados.component.css']
})

export class TicketsasginadosComponent implements OnInit {

  public colorEstado='';
  public show='';

  public showUpdate='';
  public colorEstadoUpdate='';

  public desc?:any;

  public Tickets:any = []
  public TicketAsignado?:FormGroup;

  public ticket:any;

  public priori:any = []
  public tipo:any = []
  

  public detalle?:any

  public rpta:any = [
    {data:'resuelto'},
    {data:'pendiente por devolver'},
  ]

  constructor(private fb:FormBuilder,
              private sanitizer: DomSanitizer,
              private ticketasignadoServices : AsginacionTicketService
               ) {

                this.ListarTicketAsignado();

                }

  ngOnInit(): void {
    this.TicketAsignado = this.fb.group({
      cestado:['resuelto',Validators.requiredTrue],
      cdesdes:['Se procedio con lo solicitado',Validators.requiredTrue],

    })
  }

  cerrarModal(tipo:string){
    if(tipo === 'detalle'){
      this.colorEstado='';
      this.show = '';
    }else if(tipo === 'update'){
      this.colorEstadoUpdate='';
      this.showUpdate='';
    }

  }

  ListarTicketAsignado(){
    this.ticketasignadoServices.listaAsginacionDesarrollo(0)
                      .subscribe((resp:any)=>{
                        this.Tickets = resp.tickets;                        
                        console.log(resp);
                      })
  }

  abrirModal(data:any){
    this.TicketAsignado?.reset();
    this.detalle = data;
    this.colorEstado='block';
    this.show = 'show';
  }
  abrirModalUpdate(data:any){
    this.detalle = data;
    this.colorEstadoUpdate='block';
    this.showUpdate = 'show';
  }

  valirTexto(cade:any){
    this.desc = this.sanitizer.bypassSecurityTrustHtml(cade)
    return this.desc;
  }
  BuquedaTicket(cadena:string){
    console.log(cadena);
    
  }
  abrirLink(url: string){
    window.open(`${environment.base_url}/proyecto/pdf/${url}`, "_blank");
  }
  guardarTicket(){
    const data = {...this.TicketAsignado?.value}
    
    this.ticketasignadoServices.actualizarTicketresueltorechazado(data,this.detalle.uid)
                                .subscribe((resp:any)=>{
                                  console.log(resp);
                                  this.ListarTicketAsignado();
                                  this.cerrarModal('update')
                                })
  }
  
}
