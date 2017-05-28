import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
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

  constructor(
    public navCtrl: NavController,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    private geocoder: NativeGeocoder,
    private locationAccuracy: LocationAccuracy,
    private toaster: ToastController,
  ) {}

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    let element = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element, {});
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
                zoom: 14
                // tilt: 30
              }

              map.moveCamera(pos);

              let markeroptions: MarkerOptions = {
                position: latlng,
                title: 'Minha localização'
              };

              map.addMarker(markeroptions).then((marker: Marker) => {
                marker.showInfoWindow();
              });

              this.getcountry(position);

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

  getcountry(position) {
    this.geocoder.reverseGeocode(position.coords.latitude, position.coords.longitude).then((res: NativeGeocoderReverseResult) => {
      let country = this.toaster.create({
        message: res.city + ' - ' + res.street + ' Nº ' + res.houseNumber,
        duration: 4000
      });
      country.present();
    });
  }
}
