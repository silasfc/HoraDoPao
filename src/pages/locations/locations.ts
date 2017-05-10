import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {
  @ViewChild('map') mapElement;
  map: any;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    let latLng = new google.maps.LatLng(-10.2001163,-48.3204604);

    let mapOptions = {
      center: latLng,
      zoom: 14,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
