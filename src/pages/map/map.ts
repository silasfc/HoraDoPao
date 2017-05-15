import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMaps,
  LatLng,
  CameraPosition,
  GoogleMapsEvent,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(public navCtrl: NavController, public googleMaps: GoogleMaps) {

  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    let element = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element, {});
    let latlng = new LatLng(-10.1779967, -48.3340244);

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let position: CameraPosition = {
        target: latlng,
        zoom: 13,
        tilt: 30
      }
      map.moveCamera(position);
      let markeroptions: MarkerOptions = {
        position: latlng,
        title: 'Palácio Araguaia'
      };

      map.addMarker(markeroptions).then((marker: Marker) => {
        marker.showInfoWindow();
      });
    });
  }
}
