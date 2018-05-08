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
  key: any;
  mandaSnap: any;
  data: any;
  referecia: any;
  myForm: FormGroup;
  usuarios = [];

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.myForm = this.createMyForm();
    console.log(this.myForm);
    this.getUsuarios();
   // console.log("manda snaps" + Object.keys(this.mandaSnap.val())[0]);    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendarcitaPage');
  }

  saveData() {
    this.navCtrl.setRoot(HistorialPage); //manda a home sin la flecha de arriba para regresar

    //  this.myForm.reset(); //LIMPIA LOS CAMPOS DEL FORMULARIO
  }


  enviarDatosVeter() {                              //
    var mensajesRef = firebase.database().ref().child("users/"+this.keySS+"/citas");

    mensajesRef.push({
     // paciente: this.myForm.value.paciente,
      fecha: this.myForm.value.fecha,
      hora: this.myForm.value.hora,
      motivo: this.myForm.value.motivo,
      
    });
    //Enviar los datos al veterinario  para sus expedientes.
    var enviarVeterinario = firebase.database().ref().child("veterinario");
    enviarVeterinario.push({
      paciente: this.myForm.value.paciente,
      fecha: this.myForm.value.fecha,
      hora: this.myForm.value.hora,
      motivo: this.myForm.value.motivo,
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
    this.referecia.on("value", (snap) => {
      this.data = snap.val();
      this.usuarios = [];
      this.mandaSnap = snap;
      for (this.key in this.data) {
        this.usuarios.push(this.data[this.key]);
      }
     this.keySS= Object.keys(this.mandaSnap.val())[0];
    });
  }


}
