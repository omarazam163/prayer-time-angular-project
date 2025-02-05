import { Component, inject } from '@angular/core';
import { GeoServiceService } from '../geo-service.service';
import { Ilocoation } from '../interfaces/Location';
import { TimingsService } from '../timings.service';
import { Timings } from '../interfaces/timings';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Key } from 'node:readline';
@Component({
  selector: 'app-today',
  imports: [],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss',
})
export class TodayComponent {
  _platformId = inject(PLATFORM_ID);
  _geoServiceService = inject(GeoServiceService);
  _timingsServiceService = inject(TimingsService);
  location: Ilocoation = { lat: 0, lng: 0, country: '', city: '' };
  nextTime!: string;
  date = `${new Date().getDate()}-${
    new Date().getMonth() + 1
  }-${new Date().getFullYear()}`;
  timing!: Timings;
  dataMoon!: string;
  datedis!: string;
  intervalId!: any;
  due!: string;
  prayers: (keyof Timings)[] = [
    'Fajr',
    'Sunrise',
    'Dhuhr',
    'Asr',
    'Maghrib',
    'Isha',
  ];
  async ngAfterContentInit() {
    let data2: any = await lastValueFrom(this._geoServiceService.getGeoData());
    this.location.lat = data2.latitude;
    this.location.lng = data2.longitude;
    this.location.country = data2.countryName;
    this.location.city = data2.city;
    let data: any = await lastValueFrom(
      this._timingsServiceService.getTimings(
        this.location.lat,
        this.location.lng,
        this.date
      )
    );
    this.timing = {
      Fajr: data.data.timings.Fajr,
      Sunrise: data.data.timings.Sunrise,
      Dhuhr: data.data.timings.Dhuhr,
      Asr: data.data.timings.Asr,
      Maghrib: data.data.timings.Maghrib,
      Isha: data.data.timings.Isha,
    };
    this.dataMoon =
      data.data.date.hijri.day + ' ' + data.data.date.hijri.month.en;
    this.datedis = data.data.date.readable;
    if (isPlatformBrowser(this._platformId)) {
      this.getDueTime();
      this.intervalId = setInterval(() => {
        this.getDueTime();
      }, 1000);
    }
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  getDueTime() {
    let minTime =
      parseInt(this.timing.Fajr.split(':')[0]) * 60 +
      parseInt(this.timing.Fajr.split(':')[1]);
    let min: string = 'Fajr';
    (Object.keys(this.timing) as (keyof Timings)[]).forEach((key) => {
      let current = this.timing[key];
      let hours: string = current.split(':')[0];
      let minutes: string = current.split(':')[1];
      let total: number = parseInt(hours) * 60 + parseInt(minutes);
      let now: number = new Date().getHours() * 60 + new Date().getMinutes();
      if (total >= now) {
        let diff = total - now;
        if (diff < minTime || minTime == 0) {
          minTime = diff;
          min = key;
        }
      }
    });

    this.due = `${min} in ${this.formatTime(
      Math.floor(minTime / 60),
      minTime % 60
    )}`;
  }
  formatTime(hour: number, minute: number) {
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(
      2,
      '0'
    )}`;
  }
}
