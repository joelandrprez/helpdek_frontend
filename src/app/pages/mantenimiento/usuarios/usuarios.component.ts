import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public listadoUsuario:any = [];

  public totalUsuario:any  ;
  public paginacion!: number;
  public themeColor="#260F4A";
  public desde: number = 0;


  public paginationMeta:any = { perPageItem: 0, totalItem: 0, currentPage: 0, totalPage: 0}


  constructor(private service:UsuariosService) { }

  ngOnInit(): void {
    this.listarUsuario('0')
  }

  listarUsuario(number:any){
    this.service.listarUsuarios(number)
                        .subscribe(( resp : any) =>{
                          this.listadoUsuario = resp.usuarios;
                          this.totalUsuario = resp.total;

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

  

}
