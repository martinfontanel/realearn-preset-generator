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
  @Input() optionList?: ListSelect[]; // liste des fichiers JSON des VST par folder
  @Input() inputSelect?: any; // valeur appelé quand on change le select

  /** OUTPUTS */
  @Output() valueEmit = new EventEmitter<any>(); // renvoie la valeur du parent

  change() {
    this.valueEmit.emit(this.inputSelect);
  }
}
