import { Injectable } from '@angular/core';
import { VstParameters } from '@interfaces/vst-parameters';
import { map, tap, Observable, BehaviorSubject, of } from 'rxjs';
import { LoadFileVstService } from './load-file-vst.service';
import { Parameter } from '@interfaces/parameter';

interface ParamsByPart {
  partName?: string;
  params: Parameter[];
}
const paramByPart: ParamsByPart[] = [];
const params: Parameter[] = [];

@Injectable({
  providedIn: 'root',
})
export class VstHandlerService {
  /** variables */
  loadedVst!: VstParameters;
  currentVst$!: Observable<VstParameters>;
  currentVst!: VstParameters;
  loadFile: LoadFileVstService;
  VstData: boolean = false;
  paramsByPart: BehaviorSubject<ParamsByPart[]> = new BehaviorSubject(
    paramByPart
  );
  paramsWthoutPart: BehaviorSubject<Parameter[]> = new BehaviorSubject(params);

  constructor(loadFile: LoadFileVstService) {
    this.loadFile = loadFile;
  }
  setParamsByPart(paramByPart: ParamsByPart[]) {
    this.paramsByPart.next(paramByPart);
  }

  setParamsWthoutPart(params: Parameter[]) {
    this.paramsWthoutPart.next(params);
  }

  initCurrentVst(url: string) {
    this.loadFile.setUrl(url);
    this.currentVst$ = this.loadFile.getVSTData().pipe(map(this.setCurrentVst));
  }

  setVarCurrentVst(currentVst: VstParameters) {
    this.currentVst = currentVst;
  }

  updateCurrentVst(updatedVst$: Observable<VstParameters>) {
    this.currentVst$ = updatedVst$.pipe(map(this.setCurrentVst));
  }

  setCurrentVst(data: VstParameters) {
    /** on ajoute un ID aux paramètres */
    data.parameters.map((value: any, id: number) => {
      data.parameters[id] = { ...value, id };
    });

    if (data.parts) {
      /** on ordonne les parts */
      data.parts.sort((a: any, b: any) => {
        return a < b ? -1 : 1;
      });
      /** on crée le tableau des paramètres avec partie */
      data.paramsByPart = [];
      data.parts.map((val: any) => {
        data.paramsByPart.push({
          partName: val,
          params: [...data.parameters].filter((val_) => val_.part === val),
        });
      });
    }
    /** on crée le tableau des paramètres sans partie */
    data.paramsWthoutPart = [...data.parameters].filter(
      (val) => val.part === '' || !val.part
    );
    return data;
  }

  setParamType(value: any, id: any) {
    this.currentVst.parameters[id].type = value;
    this.updateCurrentVst(of(this.currentVst));
  }

  setParamPart(value: any, id: any) {
    this.currentVst.parameters[id].part = value;
    this.updateCurrentVst(of(this.currentVst));
  }
}
