import { VstHandlerService } from '@services/vst-handler.service';
import {
  ListSelectComponent,
  ListSelect,
} from '@common/list-select/list-select.component';
import { Component } from '@angular/core';
import { LoadFileVstService } from '@services/load-file-vst.service';
import { files } from '@consts/files';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { VstParameters } from '@interfaces/vst-parameters';
import { Parameter } from '@interfaces/parameter';
import { TypeVst } from '@enums/type-vst';
import { SmartInputComponent } from '@common/smart-input/smart-input.component';
import { ParameterListComponent } from '@features/parameter-list/parameter-list.component';
import { AsyncPipe } from '@angular/common';

interface ParamsByPart {
  partName?: string;
  params: Parameter[];
}

@Component({
  selector: 'current-vst',
  standalone: true,
  imports: [
    ListSelectComponent,
    SmartInputComponent,
    ParameterListComponent,
    AsyncPipe,
  ],
  templateUrl: './current-vst.component.html',
  styleUrl: './current-vst.component.scss',
})
export class CurrentVstComponent {
  /** pour manipuler les données */
  loadFileVstService: LoadFileVstService; // loader vst service
  vstHandler: VstHandlerService;
  currentVst$!: Observable<VstParameters>; // result from loading vst datas

  /** variables de gestion */
  files: any = files; // noms des fichiers contenant les infos des VST pour le select
  url: string = ''; // url du fichier qui sera chargé avec loadFile
  fileLoaded: boolean = false; // true si un fichier est chargé
  currentVst!: VstParameters; // result from loading vst datas

  /** */
  parts: string[] = [];
  paramsWthoutPart: Parameter[] = [];

  constructor(
    loadFileVstService: LoadFileVstService,
    vstHandler: VstHandlerService
  ) {
    this.loadFileVstService = loadFileVstService;
    this.vstHandler = vstHandler;
  }

  loadFile(url: string) {
    this.vstHandler.initCurrentVst(url);
    this.setCurrentVstInfos();
  }

  setCurrentVstInfos() {
    this.currentVst$ = this.vstHandler.currentVst$;
    this.currentVst$.subscribe((value) => {
      this.currentVst = value;
      this.parts = value.parts ? value.parts : [];
      this.paramsWthoutPart = value.paramsWthoutPart;
      this.vstHandler.setParamsWthoutPart(value.paramsWthoutPart);
      this.vstHandler.setParamsByPart(value.paramsByPart);
      this.vstHandler.VstData = true;
      this.vstHandler.setVarCurrentVst(value);
      console.log(this.vstHandler.paramsByPart.getValue());
    });
  }

  updateVst() {
    this.currentVst = {
      vstName: 'MJUCjr',
      parameters: [
        {
          name: 'Compress',
          type: 'knob',
          category: 'Threshold',
        },
        {
          name: 'Makeup',
          type: 'knob',
          category: 'Makeup Gain',
        },
        {
          name: 'Timing',
          type: 'indent',
          category: '',
        },
        {
          name: 'VuMode',
          type: 'button',
          category: 'VU/GR',
        },
        {
          name: 'Bypass',
          type: 'button',
          category: 'Bypass',
        },
        {
          name: 'Bypass',
          type: 'button',
          category: 'Bypass',
        },
        {
          name: 'Bypass',
          type: '',
          category: '',
        },
        {
          name: 'Wet',
          type: '',
          category: '',
        },
        {
          name: 'Delta',
          type: '',
          category: '',
        },
      ],
      type: TypeVst.Dyn,
    };
    this.vstHandler.updateCurrentVst(of(this.currentVst));
    this.setCurrentVstInfos();
  }
}
