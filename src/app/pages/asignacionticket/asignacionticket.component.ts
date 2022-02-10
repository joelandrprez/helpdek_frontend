import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Editor, Toolbar } from 'ngx-editor';
import { AsginacionTicketService } from 'src/app/services/asginacion-ticket.service';

@Component({
  selector: 'app-asignacionticket',
  templateUrl: './asignacionticket.component.html',
  styleUrls: ['./asignacionticket.component.css']
})
export class AsignacionticketComponent implements OnInit {

  public tickets:any = []
  public desc?:any;
  public ticketAsginacion?:FormGroup;
  public detalle?:any
  public colorEstado='';
  public show='';

  public paginationMeta:any = { perPageItem: 0, totalItem: 0, currentPage: 0, totalPage: 0}

  public themeColor="#260F4A";

  html = '';
  editor!: Editor;

  toolbar!: Toolbar; 

  constructor(private asignacionServices:AsginacionTicketService,
              private sanitizer: DomSanitizer,
              private fb:FormBuilder) {
    this.listaTicketRegistrado()
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
    this.ticketAsginacion = this.fb.group({
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
  listaTicketRegistrado(){
    this.asignacionServices.listaAsginacion(0)
                            .subscribe((resp:any)=>{
                              this.tickets = resp.data
                              console.log(resp);
                              
                            })
  }
  valirTexto(cade:any){
    this.desc = this.sanitizer.bypassSecurityTrustHtml(cade)
   
    return this.desc;
  }
  cerrarModal(){
    this.colorEstado='';
    this.show = '';
  }
  guardarTicket(){

  }
  abrirModal(data:any){

    this.detalle = data
    this.colorEstado='block';
    this.show = 'show';

  }

}
