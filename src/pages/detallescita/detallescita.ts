import { Cita } from './../../clases/Cita';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetallescitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detallescita',
  templateUrl: 'detallescita.html',
})
export class DetallescitaPage {
  cita:Cita;
  tipoUsuario:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cita=navParams.get("cita");
    this.tipoUsuario=navParams.get("tipo");
    if(!this.cita.detalles){
      this.cita.getDetalles(this.tipoUsuario);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallescitaPage');
  }

}
