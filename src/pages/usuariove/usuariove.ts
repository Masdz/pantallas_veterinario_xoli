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

  referecia: any;
  usuarios = [];
  key: any;
  mandaSnap: any;
  data: any;
  keys = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getUsuarios();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuariovePage');
  }

  


  getUsuarios() {
    this.referecia = firebase.database().ref().child("users");
    this.referecia.orderByChild("tipo").equalTo("usuario").on("value", (snap) => {
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
