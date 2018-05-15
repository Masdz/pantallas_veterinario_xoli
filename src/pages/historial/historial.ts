import { DetallescitaPage } from './../detallescita/detallescita';
import { UID } from './../../vars';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Cita } from '../../clases/Cita';
/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {
  citas=[];
  mascota:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.getcitas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }
  getcitas(){
    var referencia=firebase.database().ref().child("citas");
    referencia.orderByChild("veterinario").equalTo(UID).on("value",(snap)=>{
      this.citas=[];
      var valor=snap.val();
      for(var key in valor){
        var cita=new Cita(valor[key],key);
        this.citas.push(cita);
      }
      console.log(this.citas);
    });
  }

  irDetallesCita(cita:Cita){
    this.navCtrl.push(DetallescitaPage,{"tipo":"U","cita":cita});
  }

}
