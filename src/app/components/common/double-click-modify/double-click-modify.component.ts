import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Input() optionList?: ListSelect[]; // les options à affichersi présent on a une liste déroulante
  @Input() toolTipText?: string; // texte à afficher dans le tooltip
  @Input() showButtons?: boolean = false; // si true affiche les boutons

  /** VIEWCHILDS */
  @ViewChild('input') input!: ElementRef;
  @ViewChild('listSelect') listSelect!: ElementRef;

  /** OUTPUTS */
  @Output() valueEmit = new EventEmitter<any>(); // renvoie la valeur du parent

  /** variables de gestion */
  valueModifiy: boolean = false; // true si la valeur est en cour de modification

  /** émission de la valeur vers le parent */
  change(value: any) {
    if (this.valueModifiy) {
      this.valueEmit.emit(value);
      this.valueModifiy = false;
    }
  }

  /** annulation via touche escape */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydown(event: KeyboardEvent) {
    this.valueModifiy = false;
  }

  /** soumission avec la touche enter */
  @HostListener('document:keydown.enter', ['$event'])
  onEnterKeydown(event: KeyboardEvent) {
    this.change(this.value);
  }

  /** gère le click en dehors du champs */
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (this.input) {
      if (!this.input.nativeElement.contains(event.target)) {
        this.valueModifiy = false;
      }
    }
    if (this.listSelect) {
      if (!this.listSelect.nativeElement.contains(event.target)) {
        this.valueModifiy = false;
      }
    }
  }

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: MouseEvent) {
    this.valueModifiy = true;
  }
}
