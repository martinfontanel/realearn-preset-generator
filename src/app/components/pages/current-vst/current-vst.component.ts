import { VstHandlerService } from '@services/vst-handler.service';
import {
	ListSelectComponent,
	ListSelect,
} from '@common/list-select/list-select.component';
import { Component } from '@angular/core';
import { files } from '@consts/files';
import { Observable, of } from 'rxjs';
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
	vstHandler: VstHandlerService;
	currentVst$!: Observable<VstParameters>; // result from loading vst datas

	/** variables de gestion */
	files: any = files; // noms des fichiers contenant les infos des VST pour le select
	listVstTypes: ListSelect[] = [{ children: Object.values(TypeVst) }]; // list des type de VST pour le champs select de type
	newPartValue: undefined = undefined;

	constructor(vstHandler: VstHandlerService) {
		this.vstHandler = vstHandler;
	}

	loadFile(url: string) {
		this.vstHandler.initCurrentVst(url);
		this.setCurrentVstInfos();
	}

	setCurrentVstInfos() {
		this.currentVst$ = this.vstHandler.currentVst$;
		this.currentVst$.subscribe((value: VstParameters) => {
			/** on set les datas complexes */
			/** paramsWthoutPart */
			const paramsWthoutPart: Parameter[] = [...value.parameters].filter(
				(val) => val.part === '' || !val.part
			);
			this.vstHandler.setParamsWthoutPart(paramsWthoutPart);

			if (value.parts) {
				/** parts */
				this.vstHandler.setParts(value.parts);

				/** paramsByPart */
				let paramsByPart: ParamsByPart[] = [];
				value.parts.map((val: any) => {
					paramsByPart.push({
						partName: val,
						params: [...value.parameters].filter(
							(val_) => val_.part === val
						),
					});
				});
				this.vstHandler.setParamsByPart(paramsByPart);
			}

			/** type */
			this.vstHandler.setType(value.type);

			/** currentVst no observable */
			this.vstHandler.setVarCurrentVst(value);

			this.vstHandler.VstData = true;
		});
	}

	addPart(part: { value: any; id: any }) {
		const { value, id } = part;
		if (!this.vstHandler.currentVst.parts)
			this.vstHandler.currentVst.parts = [];
		this.newPartValue = undefined;
		this.vstHandler.currentVst.parts.push(value);
		this.vstHandler.updateCurrentVst(of(this.vstHandler.currentVst));
		this.setCurrentVstInfos();
	}

	changeTypeVst(type: { value: any; id: any }) {
		const { value } = type;
		this.vstHandler.setType(value);
		this.vstHandler.currentVst.type = value;
		this.vstHandler.updateCurrentVst(of(this.vstHandler.currentVst));
		this.setCurrentVstInfos();
	}

	changePart(partChangeInfo: { value: any; id: any }) {
		const { value, id } = partChangeInfo;
		let myParams: Parameter[] = [];
		let idParams: number[] = [];
		this.vstHandler.paramsByPart.getValue()[id].params.map((val) => {
			if (val.id) idParams.push(val.id);
		});
		idParams.map((val) => {
			this.vstHandler.currentVst.parameters[val].part = value;
		});

		if (this.vstHandler.currentVst.parts)
			this.vstHandler.currentVst.parts[id] = value;

		this.vstHandler.updateCurrentVst(of(this.vstHandler.currentVst));
		this.setCurrentVstInfos();
	}
}
