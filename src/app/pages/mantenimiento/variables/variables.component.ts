import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {

  //Paginacion
  public paginationMeta:any = { perPageItem: 0, totalItem: 0, currentPage: 0, totalPage: 0}
  public desde: number = 0;
  public themeColor="#260F4A";
  // variables de la paginacion
  public variables:any=[]
  public variablesTemp:any=[]
  public totalVariables:any;
  public paginacion!: number;



  public colorEstado='';
  public show='';
  public variableRegistro?:FormGroup;

  

  //titulo modal
  public tituloModal?:string;

  //detalle variable
  public detalle?:any;



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

                  this.totalVariables = resp.total

                  this.variablesTemp = resp.proyectos
                  
                  this.paginacion = Math.floor(-(this.totalVariables / 5)) * -1;
                  this.paginationMeta={
                    perPageItem:5,
                    totalItem: resp.total,
                    currentPage: 1, 
                    totalPage: this.paginacion
                  }
                })      
  }

  cerrarModal(){
    this.colorEstado='';
    this.show = '';
  }
  guardarVariables(){
    if(this.tituloModal === 'Registro'){

      const data = {...this.variableRegistro?.value}

      this.variablesServices.guardarTicket(data)
                            .subscribe((resp:any)=>{
                              this.cerrarModal()
                              console.log(resp);
                              
      })

      console.log(data);
      
    }else if(this.tituloModal === 'Detalle'){


      
    }else if(this.tituloModal === 'Editar'){
      const data = {...this.variableRegistro?.value}
      console.log(data);
    }
  }
  abrilModal(termino:string,data?:any){
    if(termino === 'Registro'){
      this.variableRegistro?.reset()
      this.variableRegistro?.enable()
      this.tituloModal = termino;
      
    }else if(termino === 'Detalle'){
      this.detalle = data
      this.tituloModal = termino;
      this.variableRegistro?.disable()

    }else if(termino === 'Editar'){
      this.detalle = data
      this.variableRegistro?.enable()
      this.variableRegistro = this.fb.group({
        cconvar:[this.detalle?.cconvar,Validators.requiredTrue],
        cnomvar:[this.detalle?.cnomvar,Validators.requiredTrue],
        cdesvar:[this.detalle?.cdesvar,Validators.requiredTrue],
        ctipvar:[this.detalle?.ctipvar,Validators.requiredTrue]
      })
      this.tituloModal = termino;

    }
    this.colorEstado='block';
    this.show = 'show';
  }
  paginationEvents(evento:any){
    this.desde = 0
    this.desde = (evento.data*5)-5;
    this.cargarProyectosDes();
       
  }
  cargarProyectosDes() {
    this.variablesServices.listarVariables(this.desde)
      .subscribe((resp: any) => {
                  this.variables = resp.variables

                  this.totalVariables = resp.total

                  this.variablesTemp = resp.proyectos

      })
  
  }

}
