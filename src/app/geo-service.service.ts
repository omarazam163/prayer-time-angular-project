import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GeoServiceService {
  _httpClient = inject(HttpClient);
  constructor() { }
  ip:string='';
  getGeoData() {
    this._httpClient.get('https://api.ipify.org?format=json').subscribe((data: any) => {this.ip = data.ip;});
    console.log(this.ip);
    return this._httpClient.get(`http://ip-api.com/json/${this.ip}`);
  }
}
