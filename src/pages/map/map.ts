import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
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

  constructor(public navCtrl: NavController, public googleMaps: GoogleMaps, public geolocation: Geolocation, public locationAccuracy: LocationAccuracy, public alertCtrl: AlertController) {
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    let element = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element, {});
    // let latlng: LatLng = new LatLng(-10.2001416, -48.3200967);
    let latlng: LatLng;

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let options = {
        enableHighAccuracy: true
      };

      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        // if (canRequest) {
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
              latlng = new LatLng(position.coords.latitude, position.coords.longitude);

              let pos: CameraPosition = {
                target: latlng,
                zoom: 14,
                tilt: 30
              }

              map.moveCamera(pos);

              let markeroptions: MarkerOptions = {
                position: latlng,
                title: 'Minha localização'
              };

              map.addMarker(markeroptions).then((marker: Marker) => {
                marker.showInfoWindow();
              });

              // alert("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
            }).catch((err) => {
              alert(err);
            });
          }, (error) => {
            alert(error);
          });
        // }
      });



    });
  }
}
