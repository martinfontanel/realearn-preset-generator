import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadFileVstService {
  /** */
  url: string = '';

  constructor(private http: HttpClient) {}

  setUrl(url: string) {
    this.url = url;
  }

  /** vst info loader */
  getVSTData() {
    return this.http.get<any>(this.url + '.json');
  }
}
