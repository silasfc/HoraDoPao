import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { PadariasPage } from '../padarias/padarias';
import { AjustesPage } from '../ajustes/ajustes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = PadariasPage;
  tab3Root = AjustesPage;

  constructor() {

  }
}
