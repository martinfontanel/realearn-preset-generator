import { VstHandlerService } from '@services/vst-handler.service';
import { ParameterCategory } from '@interfaces/parameter-category';
import { Component, Input } from '@angular/core';
import { Parameter } from '@interfaces/parameter';
import { SmartInputComponent } from '@common/smart-input/smart-input.component';
import { typeParam } from '@consts/type-param';
import { ListSelect } from '@common/list-select/list-select.component';
import { paramCats } from '@consts/param-cat';
import {
	ParameterListStateService,
	VstParamListState,
} from '@services/parameter-list-state.service';
import { Observable, of, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'parameter-list',
	standalone: true,
	imports: [SmartInputComponent, AsyncPipe],
	templateUrl: './parameter-list.component.html',
	styleUrl: './parameter-list.component.scss',
})
export class ParameterListComponent {
	/** INPUTS */
	@Input() parameters!: Parameter[]; // les parametres à afficher
	@Input() parts!: string[]; // les parties
	@Input() initVstParent!: () => void; // méthode changement de partie
	@Input() collapsable?: boolean = false; // retractable
	@Input() listName: string = ''; // nom de la liste

	/** variable de service */
	vstHandler!: VstHandlerService;

	/** variables de gestion */
	paramCats: ParameterCategory[] = paramCats; // les catégories pour afficher dans la liste select (paramCatsFiltered)
	collapsed: boolean = false;
	collapsed$: Observable<boolean> = of(false);
	typeParam: ListSelect[] = [{ children: typeParam }]; // les types à afficher dans la list select
	partsForSelect!: ListSelect[]; // liste des parties pour le select
	paramListService;
	vstName: string = '';
	datas: VstParamListState = { vstName: '', paramListName: '' };

	constructor(
		vstHandler: VstHandlerService,
		paramListService: ParameterListStateService
	) {
		this.vstHandler = vstHandler;
		this.paramListService = paramListService;
	}

	ngOnInit(): void {
		if (this.collapsable) this.collapsed = !this.collapsable;
		this.partsForSelect = [{ children: this.parts }];
		this.vstName = this.vstHandler.currentVst.vstName;
		this.datas = { vstName: this.vstName, paramListName: this.listName };
		this.handleParamListMemory();
	}

	paramCatsFiltered(type: string): ListSelect[] {
		let toReturn: ListSelect[] = [];
		this.paramCats.map((value) => {
			const groupName: string = value.categoryName;
			let children: string[] = [];
			value.childrenParam?.map((val) => {
				if (val.type === type) children.push(val.paramName);
			});
			toReturn.push({ groupName: groupName, children: children });
		});
		return toReturn;
	}

	setParamType(type: { value: any; id: any }) {
		const { value, id } = type;
		this.vstHandler.setParamType(value, id);
		this.initVstParent();
	}

	setParamCat(cat: { value: any; id: any }) {
		const { value, id } = cat;
		this.vstHandler.setParamCat(value, id);
		this.initVstParent();
	}

	setParamPart(part: { value: any; id: any }) {
		const { value, id } = part;
		this.vstHandler.setParamPart(value, id);

		// on collapse la part qui reçoit le parametre
		this.paramListService.setState({
			vstName: this.vstName,
			paramListName: value !== '' ? value : 'unknown',
			collapsed: true,
			collapsed$: of(true),
		});
		this.initVstParent();
	}

	toggleCollapse() {
		let collapsed;

		// on récupère la valeur actuelle
		this.paramListService.getState(this.datas).subscribe((val: boolean) => {
			collapsed = val;
		});

		// on remplace par la nouvelle valeur
		this.paramListService.setState({
			vstName: this.vstName,
			paramListName: this.listName,
			collapsed: !collapsed,
			collapsed$: of(!collapsed),
		});
	}

	handleParamListMemory() {
		const recordedList = this.paramListService
			.getDatas()
			.filter(
				(val) =>
					val.vstName === this.vstName &&
					val.paramListName === this.listName
			)[0];

		/* on gère la mémoire de la parameter list */
		if (recordedList === undefined) {
			this.paramListService.setState({
				vstName: this.vstName,
				paramListName: this.listName,
				collapsed: this.collapsed,
				collapsed$: of(this.collapsed),
			});
		} else {
			this.collapsed = recordedList.collapsed
				? recordedList.collapsed
				: false;
		}
	}
}
