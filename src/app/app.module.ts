import { DetallescitaPage } from './../pages/detallescita/detallescita';
import { AgregarusuarioPage } from './../pages/agregarusuario/agregarusuario';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HistorialPage } from '../pages/historial/historial';
import { UsuariovePage } from '../pages/usuariove/usuariove';
import { AgendarcitaPage } from '../pages/agendarcita/agendarcita';
import { HistorialmascotaPage } from './../pages/historialmascota/historialmascota';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HistorialPage,
    UsuariovePage,
    AgendarcitaPage,
    HistorialmascotaPage,
    AgregarusuarioPage,
    DetallescitaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HistorialPage,
    UsuariovePage,
    AgendarcitaPage,
    HistorialmascotaPage,
    AgregarusuarioPage,
    DetallescitaPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
