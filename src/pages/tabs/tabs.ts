import { Component } from '@angular/core';

import { HistorialPage } from '../historial/historial';
import { UsuariovePage } from '../usuariove/usuariove';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HistorialPage;
  tab2Root = UsuariovePage;

  constructor() {

  }
}
