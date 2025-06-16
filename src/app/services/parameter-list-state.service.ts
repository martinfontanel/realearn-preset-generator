import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface VstParamListState {
	vstName: string;
	paramListName: string;
	collapsed?: boolean;
	collapsed$?: Observable<boolean>;
}

@Injectable({
	providedIn: 'root',
})
export class ParameterListStateService {
	private globalState: VstParamListState[] = [];

	constructor() {}

	setState(data: VstParamListState) {
		console.log('setstate', data);

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
		console.log('getstate', this.getState(data));
		return this.globalState.filter((val) => val.vstName === data.vstName);
	}

	getDatas() {
		return this.globalState;
	}

	getState(data: VstParamListState) {
		const toReturn = this.globalState.filter(
			(val) =>
				val.vstName === data.vstName &&
				val.paramListName === data.paramListName
		)[0].collapsed$;
		return toReturn ? toReturn : of(false);
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
