import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {


  
  public colorEstado='';
  public show='';
  public variableRegistro?:FormGroup;
  public variables:any=[]



  constructor(private variablesServices:VariablesService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this.listaVariables(0)
    this.variableRegistro = this.fb.group({
      cconvar:['',Validators.requiredTrue],
      cnomvar:['',Validators.requiredTrue],
      cdesvar:['',Validators.requiredTrue],
      ctipvar:['',Validators.requiredTrue]

    })
  }
  listaVariables(num:any){
    this.variablesServices.listarVariables(0)
                .subscribe((resp:any)=>{
                  console.log(resp.variables);
                  
                  this.variables = resp.variables
                })      
  }
  cerrarModal(){
    this.colorEstado='';
    this.show = '';
  }
  guardarVariables(){

  }
  abrilModal(){
    this.variableRegistro?.reset();
    this.colorEstado='block';
    this.show = 'show';
  }
  registroVariables(){

  }

}
