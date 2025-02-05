import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TimingsService {
  _httpClient = inject(HttpClient);
  constructor() { }
  getTimings(lat: number, lng: number, date: string) {
    console.log(date);
    return this._httpClient.get(`https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}` );
  }
}
