import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import Firebase from 'firebase';


var config = {
  apiKey: "AIzaSyBwMOYoi7DJ35A5RTZMAp1qy8USlS2ObTs",
  authDomain: "xoli-5618f.firebaseapp.com",
  databaseURL: "https://xoli-5618f.firebaseio.com",
  projectId: "xoli-5618f",
  storageBucket: "xoli-5618f.appspot.com",
  messagingSenderId: "933044767122"
};

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
