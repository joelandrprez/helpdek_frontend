import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  //Listado de usuarios
  public listadoUsuario:any = [];
  public listadoUsuarioTemp:any = [];
  //Paginacion
  public paginationMeta:any = { perPageItem: 0, totalItem: 0, currentPage: 0, totalPage: 0}
  public totalUsuario:any  ;
  public paginacion!: number;
  public themeColor="#260F4A";
  public desde: number = 0;


  //formulario
  public usuarioRegistro?:FormGroup;

  //titulo modal
  public tituloModal?:string;

  //control del modal
  public colorEstado='';
  public show='';

  //detalle variable
  public detalle?:any;
  


  constructor(private service:UsuariosService,
              private fb:FormBuilder) { 

  }

  ngOnInit(): void {
    this.listarUsuario('0')
    this.usuarioRegistro = this.fb.group({
      ccorusu:['j@gmail.com',Validators.requiredTrue],
      cnudoci:['48171371',Validators.requiredTrue],
      cnomusu:['j',Validators.requiredTrue],
      capeusu:['apellido',Validators.requiredTrue],
      cpaswor:['123456',Validators.requiredTrue],
      cestusu:['true',Validators.requiredTrue],
      ccodcat:['ADMINISTRADOR',Validators.requiredTrue],
      cdirusu:['Calle felipe Pardo 3000',Validators.requiredTrue],
      csexusu:['H',Validators.requiredTrue],
      dfecnac:['13-03-1993',Validators.requiredTrue]
    })
  }

  listarUsuario(number:any){
    this.service.listarUsuarios(number)
                        .subscribe(( resp : any) =>{
                          this.listadoUsuario = resp.usuarios;
                          this.totalUsuario = resp.total;
                          this.listadoUsuarioTemp = resp.usuarios
                          this.paginacion = Math.floor(-(this.totalUsuario / 5)) * -1;
                          this.paginationMeta={
                            perPageItem:5,
                            totalItem: resp.total,
                            currentPage: 1, 
                            totalPage: this.paginacion
                          }
                          
                          
    })
  }

  paginationEvents(evento:any){
    this.desde = 0
    this.desde = (evento.data*5)-5;
    this.cargarUsuarioDes()
       
  }

  cargarUsuarioDes() {
    this.service.listarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.listadoUsuario = resp.usuarios;
        this.totalUsuario = resp.total;
      })
  
  }



  guardarUsuario(){
    if(this.tituloModal === 'Registro'){

      const data = {...this.usuarioRegistro?.value}
                         
      
      Swal.fire({
        title: 'Esta de registrar este usuario?',
        text: "Despues de dar esta conformidad no se podra realizar cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.guardarUsuario(data)
          .subscribe((resp:any) =>{
            Swal.fire('Guardado','Se guardo los cambios','success');
            this.listarUsuario(0);
            this.cerrarModal();
          })
          
          Swal.fire(
            'Se registro al usuarios!',
            'Usuario Registrado.',
            'success'
          )
        }
      })
      
    }else if(this.tituloModal === 'Detalle'){

    }else if(this.tituloModal === 'Editar'){
      const data = {...this.usuarioRegistro?.value}
                       
      console.log(data);
      
      Swal.fire({
        title: 'Esta de actualizando este usuario?',
        text: "Despues de dar esta conformidad no se podra realizar cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.actualizarUsuario(data,this.detalle?.uid)
          .subscribe((resp:any) =>{
            Swal.fire('Guardado','Se guardo los cambios','success');
            this.listarUsuario(0);
            this.cerrarModal();
          })
          
          Swal.fire(
            'Se actualizo al usuarios!',
            'Usuario Registrado.',
            'success'
          )
        }
      })
    }
  }

  abrilModal(termino:string,data?:any){
    if(termino === 'Registro'){
      this.usuarioRegistro?.enable()
      this.tituloModal = termino;
      
    }else if(termino === 'Detalle'){
      this.detalle = data
      this.tituloModal = termino;
      this.usuarioRegistro?.disable()

    }else if(termino === 'Editar'){
      this.detalle = data
      console.log(data);
      
      this.usuarioRegistro?.enable()
      this.usuarioRegistro = this.fb.group({
        ccorusu:[this.detalle.ccorusu,Validators.requiredTrue],
        cnudoci:[this.detalle.cnudoci,Validators.requiredTrue],
        cnomusu:[this.detalle.cnomusu,Validators.requiredTrue],
        capeusu:[this.detalle.capeusu,Validators.requiredTrue],
        cpaswor:[this.detalle.cpaswor,Validators.requiredTrue],
        cestusu:[this.detalle.cestusu,Validators.requiredTrue],
        ccodcat:[this.detalle.ccodcat,Validators.requiredTrue],
        cdirusu:[this.detalle.cdirusu,Validators.requiredTrue],
        csexusu:[this.detalle.csexusu,Validators.requiredTrue],
        dfecnac:[this.detalle.dfecnac,Validators.requiredTrue]
      })
      this.tituloModal = termino;

    }
    this.colorEstado='block';
    this.show = 'show';
  }
  cerrarModal(){
    this.colorEstado='';
    this.show = '';
  }
  busquedaUsuario(termino:string){
    if(termino.length === 0){
      this.listadoUsuario = this.listadoUsuarioTemp;
      console.log(this.listadoUsuarioTemp);
      return ;
    }
    console.log(termino);

    this.service.buscarUsuario(termino)
                        .subscribe(( resp : any) =>{
                          this.listadoUsuario = resp.usuarios;
                          this.totalUsuario = resp.total;
                          console.log(resp);
                          
                          this.paginacion = Math.floor(-(this.totalUsuario / 5)) * -1;
                          this.paginationMeta={
                            perPageItem:5,
                            totalItem: resp.total,
                            currentPage: 1, 
                            totalPage: this.paginacion  
                          }
                          
                          
    })


  }

  

}
