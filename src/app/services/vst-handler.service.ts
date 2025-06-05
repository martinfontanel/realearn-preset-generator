import { Injectable } from '@angular/core';
import { VstParameters } from '@interfaces/vst-parameters';
import { map, Observable, BehaviorSubject, of } from 'rxjs';
import { LoadFileVstService } from './load-file-vst.service';
import { Parameter } from '@interfaces/parameter';

interface ParamsByPart {
	partName?: string;
	params: Parameter[];
}
const paramByPart: ParamsByPart[] = [];
const params: Parameter[] = [];
const parts: string[] = [];

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

	/** données dynamiques */
	parts: BehaviorSubject<string[]> = new BehaviorSubject(parts);
	paramsByPart: BehaviorSubject<ParamsByPart[]> = new BehaviorSubject(
		paramByPart
	);
	paramsWthoutPart: BehaviorSubject<Parameter[]> = new BehaviorSubject(
		params
	);
	type: BehaviorSubject<string> = new BehaviorSubject('');

	constructor(loadFile: LoadFileVstService) {
		this.loadFile = loadFile;
	}

	/** on set les Behaviorsubject issues de l'ibservable pour un traitement dynamique */
	setParamsByPart(paramByPart: ParamsByPart[]) {
		this.paramsByPart.next(paramByPart);
	}

	setParamsWthoutPart(params: Parameter[]) {
		this.paramsWthoutPart.next(params);
	}

	setParts(parts: string[]) {
		this.parts.next(parts);
	}

	setType(type: string) {
		this.type.next(type);
	}

	initCurrentVst(url: string) {
		this.loadFile.setUrl(url);
		this.currentVst$ = this.loadFile
			.getVSTData()
			.pipe(map(this.setCurrentVst));
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
		}
		return data;
	}

	/** on applique les changements */
	setParamType(value: any, id: any) {
		this.currentVst.parameters[id].type = value;
		this.updateCurrentVst(of(this.currentVst));
	}

	setParamPart(value: any, id: any) {
		this.currentVst.parameters[id].part = value;
		this.updateCurrentVst(of(this.currentVst));
	}

	setParamCat(value: any, id: any) {
		this.currentVst.parameters[id].category = value;
		this.updateCurrentVst(of(this.currentVst));
	}
}
