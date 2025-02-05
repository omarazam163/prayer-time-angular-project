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
    this._httpClient.get('https://api.ipify.org?format=json').subscribe((res: any) => {
      this.ip = res.ip
    })
    return this._httpClient.get(
              `https://apiip.net/api/check?ip=${this.ip}&accessKey=fdcd50df-6653-49e6-87cb-ee2660e7c95c`
            );
  }
}
