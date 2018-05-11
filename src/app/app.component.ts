import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import Firebase from 'firebase';


var config = {
  apiKey: "AIzaSyBAiwyfqfntcYE71J5Dtx_A58x5JmHyx1Q",
  authDomain: "xoli-base.firebaseapp.com",
  databaseURL: "https://xoli-base.firebaseio.com",
  projectId: "xoli-base",
  storageBucket: "xoli-base.appspot.com",
  messagingSenderId: "51959554942"
};

var uid="jklñ";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    Firebase.initializeApp(config);  
  }
}
