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
  key: any;
  mandaSnap: any;
  data: any;
  pacientes=[];
  mascotas=[];
  keysPacientes=[];
  
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
    this.referencia=firebase.database().ref().child("users/"+uid+"/pacientes");
    this.referencia.on("value",(snap)=>{
      this.data=snap.val();
      this.keysPacientes=[];
      for(this.key in this.data){
        this.keysPacientes.push(this.key);
        var referencia2=firebase.database().ref().child("users/"+this.key)
        referencia2.once("value",(snap)=>{
          this.pacientes=[];
          this.pacientes.push(snap.val());
        });
      }
    });
  }

  getmascotas(data){
    var key;
    var mascotas=[];
    for(key in data){
      mascotas.push(data[key]);
    }
    return mascotas
  }

  
  getUsuarios() {
    this.referencia = firebase.database().ref().child("users");
    this.referencia.orderByChild("tipo").equalTo("usuario").on("value", (snap) => {
      this.data = snap.val();
      this.usuarios = [];
      this.mandaSnap = snap;
      for (this.key in this.data) {
        this.usuarios.push(this.data[this.key]);
        this.keys.push(this.key);
      }
     console.log(this.usuarios);
     console.log("keys="+this.keys);
     
    });
  }
}
