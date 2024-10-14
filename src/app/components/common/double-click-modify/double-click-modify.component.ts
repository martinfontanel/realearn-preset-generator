import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ListSelect,
  ListSelectComponent,
} from '@common/list-select/list-select.component';

@Component({
  selector: 'double-click-modify',
  standalone: true,
  imports: [ListSelectComponent, FormsModule],
  templateUrl: './double-click-modify.component.html',
  styleUrl: './double-click-modify.component.scss',
})
export class DoubleClickModifyComponent {
  /** INPUTS */
  @Input() value: any; // la valeur à afficher ou modifier
  @Input() optionList?: ListSelect[]; // les options à afficher

  /** OUTPUTS */
  @Output() valueEmit = new EventEmitter<any>(); // renvoie la valeur du parent

  valueModifiy: boolean = false;
  toolTipText?: string;

  change(value: any) {
    if (this.valueModifiy) {
      this.valueEmit.emit(this.value);
      this.valueModifiy = false;
    }
  }
}
