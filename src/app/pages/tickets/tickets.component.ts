import { Component, NgZone, OnInit } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {


  html = '';
  editor!: Editor;

  toolbar!: Toolbar; 

  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

  isActive = false;
  isDisabled = false;

  //modals
  public colorEstado='';
  public show='';

  public colorEstadoU='';
  public showU='';

  public matriculaForm?:FormGroup;

  public desc?:any;

  constructor(private fb:FormBuilder,
                private router:Router,
                private ngzone:NgZone) {

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
    this.matriculaForm = this.fb.group({
      cnommat:['',Validators.requiredTrue],
      cdescri:['',Validators.requiredTrue],
      npremmat:['',Validators.requiredTrue],
      creqmmat:['',Validators.requiredTrue],
      ndurmmat:['',Validators.requiredTrue],
      dfecini:['',Validators.requiredTrue],
      ccurens:['61592ee2bc0966dd656f1933',Validators.requiredTrue]

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
    
    this.colorEstado='block';
    this.show = 'show';

    console.log(this.colorEstadoU,this.showU);
    
  }
  cerrarModal(){
    this.colorEstado='';
    this.show = '';
  }
  guardar(){}

}
