import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeoServiceService {
  private _httpClient = inject(HttpClient);
  private _platformId = inject(PLATFORM_ID);

  constructor() {}
  ip="";
  getGeoData(): Observable<any> {
    this._httpClient.get('https://api.ipify.org?format=json').subscribe((res: any) => {
      this.ip = res.ip
    })
    return this._httpClient.get(
              `https://apiip.net/api/check?ip=${this.ip}&accessKey=fdcd50df-6653-49e6-87cb-ee2660e7c95c`
            );
  }
}

