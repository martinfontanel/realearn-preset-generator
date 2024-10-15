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

interface ParamsByPart {
  partName?: string;
  params: Parameter[];
}

@Component({
  selector: 'home',
  standalone: true,
  imports: [ListSelectComponent, SmartInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  /** pour manipuler les données */
  loadFileVstService: LoadFileVstService; // loader vst service
  loadedVst$?: Observable<VstParameters>; // result from loading vst datas

  /** variables de gestion */
  files: any = files; // noms des fichiers contenant les infos des VST pour le select
  url: string = ''; // url du fichier qui sera chargé avec loadFile
  fileLoaded: boolean = false; // true si un fichier est chargé
  listVstTypes: ListSelect[] = [{ children: Object.values(TypeVst) }]; // list des type de VST pour le champs select de type

  /** variables à afficher */
  vstName: string = ''; // nom du VST
  type?: TypeVst; // type de VST
  paramsByPart: ParamsByPart[] = []; // tri des parametres de VST par partie

  constructor(loadFileVstService: LoadFileVstService) {
    this.loadFileVstService = loadFileVstService;
  }

  /** charge le doc avec les infos d'un VST */
  loadFile(url: string) {
    this.loadFileVstService.setUrl(url);
    this.loadedVst$ = this.loadFileVstService.getVSTData();

    this.loadedVst$.subscribe((value) => {
      this.vstName = value.vstName;
      this.type = value.type;
      let paramsWthoutPart: Parameter[] = value.parameters.filter(
        (val) => val.part === '' || !val.part
      );
      value.parts.map((val) => {
        let paramsArray: Parameter[] = value.parameters.filter(
          (val_) => val_.part === val
        );
        this.paramsByPart.push({ partName: val, params: paramsArray });
      });
      this.paramsByPart.push({ params: paramsWthoutPart });
      console.log(this.paramsByPart);
      this.fileLoaded = true;
    });
  }

  changeTypeVst(type: TypeVst) {
    this.type = type;
  }

  changePart(partName: string) {
    console.log(partName);
  }
}
