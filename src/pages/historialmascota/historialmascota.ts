import { AgendarcitaPage } from './../agendarcita/agendarcita';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Cita } from '../../clases/Cita';
/**
 * Generated class for the HistorialmascotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historialmascota',
  templateUrl: 'historialmascota.html',
})
export class HistorialmascotaPage {
  mascota:any;
  pantalla:"citas";
  vacunas=[];
  citas=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mascota=navParams.get("mascota");
    this.getcitas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialmascotaPage');
  }

  getcitas(){
    var referencia=firebase.database().ref().child("citas");
    referencia.orderByChild("mascota").equalTo(this.mascota.key).on("value",(snap)=>{
      this.citas=[];
      var valor=snap.val();
      for(var key in valor){
        var cita=new Cita(valor[key],key);
        if(valor[key].tipo=='cita'){
          this.citas.push(cita);
        }else{
          this.vacunas.push(cita);
        }
      }
      console.log(this.citas);
    });
  }
  
  iragendarcita(){
    this.navCtrl.push(AgendarcitaPage,{"mascota":this.mascota});
  }
}
