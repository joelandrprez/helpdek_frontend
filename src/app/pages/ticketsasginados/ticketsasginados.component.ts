import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Editor, Toolbar } from 'ngx-editor';
import { AsginacionTicketService } from 'src/app/services/asginacion-ticket.service';

@Component({
  selector: 'app-ticketsasginados',
  templateUrl: './ticketsasginados.component.html',
  styleUrls: ['./ticketsasginados.component.css']
})

export class TicketsasginadosComponent implements OnInit {

  public colorEstado='';
  public show='';

  html = '';
  editor!: Editor;

  toolbar!: Toolbar; 
  colorPresets = ['red', '#223e9c', 'rgb(255, 0, 0)'];
  public desc?:any;

  public Tickets:any = []
  public ticketActualizar?:FormGroup;

  public ticket:any;

  public priori:any = []
  public tipo:any = []
  

  constructor(private fb:FormBuilder,
              private sanitizer: DomSanitizer,
              private ticketasignadoServices : AsginacionTicketService
               ) {

                this.ListarTicketAsignado();
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
    this.ticketActualizar = this.fb.group({
      cestado:['',Validators.requiredTrue],
      cdesasi:['',Validators.requiredTrue],
      cdesate:['',Validators.requiredTrue],
    })
  }

  cerrarModal(){
    this.colorEstado='';
    this.show = '';
  }

  ListarTicketAsignado(){
    this.ticketasignadoServices.listaAsginacionDesarrollo(0)
                      .subscribe((resp:any)=>{
                        this.Tickets = resp.tickets;                        
                      })
  }

  abrirModal(data:any){
    this.ticketActualizar?.reset();
    this.ticket = data;
    this.colorEstado='block';
    this.show = 'show';
  }

  guardarTicket(){

  }
  valirTexto(cade:any){
    this.desc = this.sanitizer.bypassSecurityTrustHtml(cade)
    return this.desc;
  }
}
