import {UID} from './../../vars';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HistorialPage } from '../historial/historial';
import * as firebase from 'firebase';
/**
 * Generated class for the AgendarcitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agendarcita',
  templateUrl: 'agendarcita.html',
})
export class AgendarcitaPage {

  keySS: string;
  public key: any;
  mandaSnap: any;
  public data: any;
  referecia: any;
  myForm: FormGroup;
  usuarios = [];
  keys=[];
  paciente:any;
  uid:String;

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.myForm = this.createMyForm();
    console.log(this.myForm);
    this.getUsuarios();
    this.uid=UID;
   // console.log("manda snaps" + Object.keys(this.mandaSnap.val())[0]);    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendarcitaPage');
  }

  saveData() {
    this.navCtrl.setRoot(HistorialPage); //manda a home sin la flecha de arriba para regresar

    //  this.myForm.reset(); //LIMPIA LOS CAMPOS DEL FORMULARIO
  }

  setPaciente(i){
    console.log('setPaciente:'+i);
     this.paciente=i;
  }
/*
  enviarDatosVeter() {                              //
    var mensajesRef = firebase.database().ref().child("citas");
    mensajesRef.push({
     // paciente: this.myForm.value.paciente, 
      fecha: this.myForm.value.fecha,
      hora: this.myForm.value.hora,
      motivo: this.myForm.value.motivo
    });
*/
  enviarDatosVeter() {
    console.log('Veterinario'+this.myForm.value.paciente);                             
    console.log('paciente'+this.uid);                             
    var mensajesRef = firebase.database().ref().child("citas");
    mensajesRef.push({
      fecha: this.myForm.value.fecha,
      hora: this.myForm.value.hora,
      motivo: this.myForm.value.motivo,
      veterinario: this.uid,
      paciente:this.myForm.value.paciente
    });
    
    /*
    De Vacunas
    FechaAplicacion
    NombreVacuna
    FechaProximaVac

    Cita:
    Id_usuario
    Id_veterinario

    Fecha
    Hora
    Motivo
    Veterinario:
    Cédula
    Especialidad
    Id_vetetinario*/
  }

  
  private createMyForm() {  //VALIDA QUE EL FORMULARIO ESTE VALIDADO Y ASI SE PUEDA
    return this.formBuilder.group({
      paciente: ['', Validators.required],
       //: ['', Validators.required],
      fecha: ['', Validators.required],
    //  dateEnd: ['', Validators.required],
      hora: ['', Validators.required],
     // timeEnd: ['', Validators.required],
      motivo: ['', Validators.required],
    //  invitados: ['', Validators.required]
    });
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
     this.keySS= Object.keys(this.mandaSnap.val())[0];
     console.log(this.usuarios);
     console.log("keys="+this.keys);
     
    });
  }


}