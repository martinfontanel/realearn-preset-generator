import { Injectable } from '@angular/core';
import { VstParameters } from '@interfaces/vst-parameters';

@Injectable({
  providedIn: 'root',
})
export class VstHandlerService {
  /** variables */
  loadedVst!: VstParameters;

  constructor() {}

  setParamType(value: any, id: any) {
    this.loadedVst.parameters[id].type = value;
  }
}
