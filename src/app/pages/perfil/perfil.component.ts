import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario?:Usuario = new Usuario();
  public perfilForm!:FormGroup;
  // public utDisabled=new FormControl(true);
  public utDisabled:any;

  constructor(private usuarioServices:LoginService,
              private fb:FormBuilder) { 
                this.usuario = usuarioServices.usuario
                
                console.log(this.usuario);
                
  }

  ngOnInit(): void {
    this.utDisabled = null
    if( this.usuario?.ccodcat==='ADM' ){
      this.utDisabled = null
    }  
    else{
      this.utDisabled = true
    }
    this.perfilForm = this.fb.group({
      nombre:[this.usuario?.cnomusu,Validators.required],
      email:[this.usuario?.ccorusu,[Validators.required,Validators.email]],
      categoria:[this.usuario?.ccodcat,[Validators.required,Validators.email]],
      direccion:[this.usuario?.cdirusu,[Validators.required,Validators.email]],
      estado:[this.usuario?.cestusu,[Validators.required,Validators.email]],
      sexo:[this.usuario?.csexusu,[Validators.required,Validators.email]],
      dfecnac:[this.usuario?.dfecnac,[Validators.required,Validators.email]],
      nimgusu:[this.usuario?.nimgusu,[Validators.required,Validators.email]],

    });
  }

  actualizarPerfil(){

  }

}
