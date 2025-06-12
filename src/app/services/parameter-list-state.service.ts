import { Injectable } from '@angular/core';

export interface VstParamListState {
	vstName: string;
	paramListName: string;
	collapsed: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class ParameterListStateService {
	private globalState: VstParamListState[] = [];

	constructor() {}

	setState(data: VstParamListState) {
		let newState: VstParamListState[] = [];
		if (this.verif(data)) {
			this.globalState.map((val) => {
				if (
					val.vstName === data.vstName &&
					val.paramListName === data.paramListName
				) {
					newState.push(data);
					val = data;
				} else {
					newState.push(val);
				}
			});
			this.globalState = newState;
		} else this.globalState.push(data);
		return this.globalState.filter((val) => val.vstName === data.vstName);
	}

	getDatas() {
		return this.globalState;
	}

	verif(data: VstParamListState) {
		if (
			this.globalState.filter(
				(val) =>
					val.vstName === data.vstName &&
					val.paramListName === data.paramListName
			)[0]
		)
			return true;
		else return false;
	}
}
