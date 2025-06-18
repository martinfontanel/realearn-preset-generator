import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ListSelect {
	groupName?: string;
	children: string[];
}

@Component({
	selector: 'list-select',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './list-select.component.html',
	styleUrl: './list-select.component.scss',
})
export class ListSelectComponent {
	/** INPUTS */
	@Input() optionList?: ListSelect[] = []; // liste des fichiers JSON des VST par folder
	@Input() emptyLabel?: string; // le label pour une entrée vide dans la liste select
	@Input() inputSelect?: any; // valeur appelé quand on change le select
	@Input() invisibleValue?: string; // valeur dans la liste à invisibiliser

	/** OUTPUTS */
	@Output() valueEmit = new EventEmitter<any>(); // renvoie la valeur du parent

	optionListToShow: ListSelect[] = [];

	ngOnInit() {
		this.optionList?.map((group) => {
			let groupTMP: ListSelect = {
				groupName: group.groupName,
				children: [],
			};
			group.children.map((child) => {
				if (child !== this.invisibleValue)
					groupTMP.children.push(child);
			});
			this.optionListToShow.push(groupTMP);
		});
	}

	change() {
		this.valueEmit.emit(this.inputSelect);
	}
}
