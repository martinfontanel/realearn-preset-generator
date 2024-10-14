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
    return this.http.get<any>(this.url + '.json').pipe(
      /** on ajoute un ID pour chaque paramètre pour l'ordre */
      map((data: any) => {
        data.parameters.map((value: any, id: number) => {
          data.parameters[id] = { ...value, id };
        });
        /** on ordonne les parts */
        data.parts.sort((a: any, b: any) => {
          return a < b ? -1 : 1;
        });
        return data;
      })
    );
  }
}
