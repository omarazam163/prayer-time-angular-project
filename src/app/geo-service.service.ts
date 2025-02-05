import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeoServiceService {
  private _httpClient = inject(HttpClient);
  private _platformId = inject(PLATFORM_ID);
  
  constructor() { }

  getGeoData(): Observable<any> {
    if (isPlatformBrowser(this._platformId)) {
      return this._httpClient.get<{ ip: string }>('https://api.ipify.org?format=json').pipe(
        switchMap((res) => {
          const userIp = res.ip;
          return this._httpClient.get(
            `https://apiip.net/api/check?ip=${userIp}&accessKey=fdcd50df-6653-49e6-87cb-ee2660e7c95c`
          );
        })
      );
    } else {
      // Running on the server, use a default IP
      return this._httpClient.get(
        `https://apiip.net/api/check?ip=8.8.8.8&accessKey=fdcd50df-6653-49e6-87cb-ee2660e7c95c`
      );
    }
  }
}
