import { HistorialmascotaPage } from './../historialmascota/historialmascota';
import { Usuario } from './../../clases/Usuario';
import { USUARIO, UID } from './../../vars';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the UsuariovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuariove',
  templateUrl: 'usuariove.html',
})
export class UsuariovePage {

  referencia: any;
  usuarios = [];
  mandaSnap: any;
  pacientes=[];
  mascotas=[];
  
  keys = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getUsuarios();
    this.getPacientes();
    console.log(USUARIO);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuariovePage');
  }

  
  getPacientes(){
    var uid=UID;
    var key;
    var refEnVeterinario=firebase.database().ref().child("users/"+uid+"/pacientes");
    refEnVeterinario.on("value",(snap)=>{
      this.pacientes=[];
      for(key in snap.val()){
        var refEnPaciente=firebase.database().ref().child("users/"+key)
        refEnPaciente.once("value",(snap2)=>{
          var usuario=new Usuario(snap2.val(),key);
          this.pacientes.push(usuario);
        });
      }
    });
  }

  toggleMascotasVisibles(usuario){
    if(usuario.mascotasVisibles){
      usuario.mascotasVisibles=false;
    }else{
      usuario.mascotasVisibles=true;
    }
  }

  test(){
    var fecha=new Date();
    var tiempo=fecha.toUTCString();
    console.log("boton presionado "+tiempo);
  }
  
  irhistorialmascota(mascota){
    this.navCtrl.push(HistorialmascotaPage,{"mascota":mascota});
  }

  getUsuarios() {
    var data;
    var key;
    this.referencia = firebase.database().ref().child("users");
    this.referencia.orderByChild("tipo").equalTo("U").on("value", (snap) => {
      data = snap.val();
      this.usuarios = [];
      this.mandaSnap = snap;
      for (key in data) {
        this.usuarios.push(data[key]);
        this.keys.push(key);
      }
     console.log(this.usuarios);
     console.log("keys="+this.keys);
     
    });
  }
}
