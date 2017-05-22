import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html'
})

export class GeolocationPage {

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder,
    public toaster: ToastController,
    private locationAccuracy: LocationAccuracy
  ) {}

  geolocate() {
    let options = {
      enableHighAccuracy: true
    };

    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      alert(canRequest);
      // if (canRequest) {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
          this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
            alert("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
            this.getcountry(position);
          }).catch((err) => {
            // alert(err);
            alert('Não consegui sua localização');
          });
        }, (error) => {
          // alert(error);
          alert('Não consegui a permissão necessária');
        });
      // }
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
