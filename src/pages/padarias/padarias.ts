import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-padarias',
  templateUrl: 'padarias.html'
})
export class PadariasPage {

  // constructor(public navCtrl: NavController) {
  //
  // }
  //CODIGO FUNCIONANDO ATE...
  // public feeds: Array<string>;
  // private url: string = "https://www.reddit.com/new.json";
  //
  // constructor(public navCtrl: NavController, public http: Http) {
  //
  //     this.http.get(this.url).map(res => res.json())
  //         .subscribe(data => {
  //             this.feeds = data.data.children;
  //         });
  // }
  //... AQUI

  public feeds: Array<string>;
  private url: string = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=Padaria+in+Palmas-TO&key=AIzaSyAeJB8MoGIWW2-w6lGd-sLrDyEEKcHMlR8";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.http.get(this.url).map(res => res.json()).subscribe(data => {
      this.feeds = data.results;
    });

    console.log('Padarias em: ' + this.navParams.get('city'));
  }

}
