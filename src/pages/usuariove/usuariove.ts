import { AgregarusuarioPage } from './../agregarusuario/agregarusuario';
import { HistorialmascotaPage } from './../historialmascota/historialmascota';
import { Usuario } from './../../clases/Usuario';
import { USUARIO, UID } from './../../vars';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  pacientes=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
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
        console.log("usuario "+key)
        var refEnPaciente=firebase.database().ref().child("users/"+key)
        refEnPaciente.once("value",(snap2)=>{
          var usuario=new Usuario(snap2.val(),snap2.key);
          this.pacientes.push(usuario);
        });
      }
    });
  }

  toggleMascotasVisibles(usuario){
    if(usuario.mascotasVisibles){
      usuario.mascotasVisibles=false;
    }else{
      if(usuario.mascotas.length==0){
        usuario.getmascotas();
        console.log("mascotas obtenidas");
      }
      usuario.mascotasVisibles=true;
    }
  }

  test(){
    var fecha=new Date();
    var tiempo=fecha.toUTCString();
    console.log("boton presionado "+tiempo);
  }

  eliminarPacientes(index,paciente){
    let confim=this.alertCtrl.create({
      title:"Eliminar",
      message:"Desea eliminar este elemento",
      buttons:[
        {
          text: "Cancelar",
          handler:()=>{
            this.toggleMascotasVisibles(paciente);  
          }
        },
        {
          text: "Aceptar",
          handler:()=>{
            firebase.database().ref().child("users/"+UID+"/pacientes/"+paciente.key).remove();
          }
        }
      ]
    });
    confim.present();
  }
  
  irhistorialmascota(mascota){
    this.navCtrl.push(HistorialmascotaPage,{"mascota":mascota});
  }
  irAddUsuario(){
    this.navCtrl.push(AgregarusuarioPage);
  }
}
