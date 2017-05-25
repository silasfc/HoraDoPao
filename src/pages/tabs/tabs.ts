import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { GeolocationPage } from '../geolocation/geolocation';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = GeolocationPage;

  constructor() {

  }
}
