import { VstHandlerService } from '@services/vst-handler.service';
import {
  ListSelectComponent,
  ListSelect,
} from '@common/list-select/list-select.component';
import { Component } from '@angular/core';
import { LoadFileVstService } from '@services/load-file-vst.service';
import { files } from '@consts/files';
import { Observable } from 'rxjs';
import { VstParameters } from '@interfaces/vst-parameters';
import { Parameter } from '@interfaces/parameter';
import { TypeVst } from '@enums/type-vst';
import { SmartInputComponent } from '@common/smart-input/smart-input.component';
import { ParameterListComponent } from '@features/parameter-list/parameter-list.component';

interface ParamsByPart {
  partName?: string;
  params: Parameter[];
}

@Component({
  selector: 'home',
  standalone: true,
  imports: [ListSelectComponent, SmartInputComponent, ParameterListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  /** pour manipuler les données */
  loadFileVstService: LoadFileVstService; // loader vst service
  vstHandler: VstHandlerService;
  loadedVst$!: Observable<VstParameters>; // result from loading vst datas

  /** variables de gestion */
  files: any = files; // noms des fichiers contenant les infos des VST pour le select
  url: string = ''; // url du fichier qui sera chargé avec loadFile
  fileLoaded: boolean = false; // true si un fichier est chargé
  listVstTypes: ListSelect[] = [{ children: Object.values(TypeVst) }]; // list des type de VST pour le champs select de type
  loadedVst!: VstParameters; // les infos bruts du Vst

  /** variables à afficher */
  vstName: string = ''; // nom du VST
  type?: TypeVst; // type de VST
  parts?: string[]; // les parties du VST
  paramsByPart: ParamsByPart[] = []; // tri des parametres de VST par partie
  paramsWthoutPart: Parameter[] = []; // list des paramètres sans partie

  constructor(
    loadFileVstService: LoadFileVstService,
    vstHandler: VstHandlerService
  ) {
    this.loadFileVstService = loadFileVstService;
    this.vstHandler = vstHandler;
  }

  /** charge le doc avec les infos d'un VST */
  loadFile(url: string) {
    this.loadFileVstService.setUrl(url);
    this.loadedVst$ = this.loadFileVstService.getVSTData();

    this.loadedVst$.subscribe((value) => {
      this.vstHandler.loadedVst = value;
      this.vstName = value.vstName;
      this.initVst();
    });
  }

  /** initialise les infos du Vst et les variables */
  initVst() {
    this.paramsByPart = [];
    this.paramsWthoutPart = [];
    if (this.vstHandler.loadedVst) {
      this.type = this.vstHandler.loadedVst.type;
      this.parts = this.vstHandler.loadedVst.parts;
      this.paramsWthoutPart = [...this.vstHandler.loadedVst.parameters].filter(
        (val) => val.part === '' || !val.part
      );
      if (this.vstHandler.loadedVst.parts) {
        this.vstHandler.loadedVst.parts.map((val) => {
          let paramsArray: Parameter[] = [
            ...this.vstHandler.loadedVst.parameters,
          ].filter((val_) => val_.part === val);
          this.paramsByPart.push({ partName: val, params: paramsArray });
        });
      }

      this.paramsByPart.push({ params: this.paramsWthoutPart });
      this.fileLoaded = true;
    }
  }

  changeTypeVst(type: { value: any; id: any }) {
    const { value } = type;
    this.type = value;
  }

  /** cette fonction buggue */
  changePart(partChangeInfo: { value: any; id: any }) {
    const { value, id } = partChangeInfo;
    let idParams: number[] = [];
    this.paramsByPart[id].partName = value;
    this.parts![id] = value;
    this.paramsByPart[id].params.map((val) => {
      val.part = value;
      if (val.id) idParams.push(val.id);
    });

    idParams.map((val) => {
      this.vstHandler.loadedVst!.parameters[val].part = value;
    });
    this.vstHandler.loadedVst.parts = this.parts!;
  }
}
