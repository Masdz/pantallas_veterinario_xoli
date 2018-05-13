import { Mascota } from './Mascota';
export class Usuario{
    public data:any;
    public key:String;
    public mascotas:any;
    public mascotasVisibles:boolean;
    constructor(data,key){
        this.key=key;
        this.data=data;
        this.mascotas=[];
        this.mascotasVisibles=false;
        var key;
        for(key in data.mascotas){
            var dataMascota=data.mascotas[key];
            var mascota=new Mascota(dataMascota,key);      
            this.mascotas.push(mascota);
        }

    }
};