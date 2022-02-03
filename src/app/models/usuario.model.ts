import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public _id?:string,
        public ccorusu?:string,
        public cnomusu?:string,
        public cpaswor?:string,
        public cestusu?:string,
        public ccodcat?:string,


        public nnumint?:string,
        public cdirusu?:string,
        public csexusu?:string,
        public dfecnac?:string,


        public npresec?:string,
        public nressec?:string,
        public nimgusu?:string,
        public cusureg?:string,
        public dfecreg?:string,
        public cusumod?:string,
        public dfecmod?:string,

        ) {
        
    }
    get imagenUrl(){
        if( !this.nimgusu ){
            return `${base_url}/upload/usuarios/no-image`;
            
        }else if( this.nimgusu?.includes('https') ){
            return this.nimgusu;
        }
        else if(this.nimgusu){
            return `${base_url}/upload/usuarios/${this.nimgusu}`;
        }else{
            return `${base_url}/upload/usuarios/no-image`;
        }
        // http://localhost:3000/api/upload/usuarios/no-image
        
    }

}