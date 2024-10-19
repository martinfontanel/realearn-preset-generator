import { VstHandlerService } from '@services/vst-handler.service';
import { ParameterCategory } from '@interfaces/parameter-category';
import { Component, Input } from '@angular/core';
import { Parameter } from '@interfaces/parameter';
import { SmartInputComponent } from '@common/smart-input/smart-input.component';
import { typeParam } from '@consts/type-param';
import { ListSelect } from '@common/list-select/list-select.component';
import { paramCats } from '@consts/param-cat';
import { of } from 'rxjs';

@Component({
  selector: 'parameter-list',
  standalone: true,
  imports: [SmartInputComponent],
  templateUrl: './parameter-list.component.html',
  styleUrl: './parameter-list.component.scss',
})
export class ParameterListComponent {
  /** INPUTS */
  @Input() parameters!: Parameter[]; // les parametres à afficher
  @Input() parts!: string[]; // les parties
  @Input() initVstParent!: () => void; // méthode changement de partie

  /** variable de service */
  vstHandler!: VstHandlerService;

  /** variables de gestion */
  paramCats: ParameterCategory[] = paramCats; // les catégories pour afficher dans la liste select (paramCatsFiltered)

  typeParam: ListSelect[] = [{ children: typeParam }]; // les types à afficher dans la list select
  partsForSelect!: ListSelect[]; // liste des parties pour le select

  constructor(vstHandler: VstHandlerService) {
    this.vstHandler = vstHandler;
  }

  ngOnInit(): void {
    this.partsForSelect = [{ children: this.parts }];
  }

  paramCatsFiltered(): ListSelect[] {
    return [];
  }

  setParamType(type: { value: any; id: any }) {
    const { value, id } = type;
    this.vstHandler.setParamType(value, id);
    this.initVstParent();
  }

  setParamCat(cat: { value: any; id: any }) {
    const { value, id } = cat;
    //this.vstHandler.loadedVst.parameters[id].category = value;
    this.initVstParent();
  }

  async setParamPart(part: { value: any; id: any }) {
    const { value, id } = part;
    //this.vstHandler.setParamPart(value, id);
    this.vstHandler.VstData = false;
    this.vstHandler.currentVst.parameters[id].part = value;
    this.vstHandler.updateCurrentVst(of(this.vstHandler.currentVst));
    this.initVstParent();
  }
}
