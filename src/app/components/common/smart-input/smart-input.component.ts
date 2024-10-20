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
  selector: 'smart-input',
  standalone: true,
  imports: [ListSelectComponent, FormsModule],
  templateUrl: './smart-input.component.html',
  styleUrl: './smart-input.component.scss',
})
export class SmartInputComponent {
  /** INPUTS */
  @Input() value: any; // la valeur à afficher ou modifier
  @Input() optionList?: ListSelect[]; // les options à affichersi présent on a une liste déroulante
  @Input() toolTipText?: string; // texte à afficher dans le tooltip
  @Input() showButtons?: boolean = false; // si true affiche les boutons
  @Input() id?: any; // à transmettre au parent
  @Input() resetWhenSubmitted: boolean = false; // reviens à undefined quand la valeur est définie

  /** VIEWCHILDS */
  @ViewChild('input') input!: ElementRef;
  @ViewChild('listSelect') listSelect!: ElementRef;

  /** OUTPUTS */
  @Output() valueEmit = new EventEmitter<any>(); // renvoie la valeur du parent

  /** variables de gestion */
  valueModifiy: boolean = false; // true si la valeur est en cour de modification
  addNewElement: boolean = false; // true si la valeur est vide
  formerValue: any; // valeur d'origine en cas d'erreur

  ngOnInit(): void {
    this.formerValue = this.value;
    this.verifValue();
  }

  /** on vérifie la veleur du champs */
  verifValue(): boolean {
    let toReturn: boolean;
    switch (this.value) {
      case undefined:
        this.addNewElement = true;
        toReturn = false;
        break;
      case '[object Event]':
      case '':
        this.value = this.formerValue;
        toReturn = false;
        break;

      default:
        this.valueModifiy = false;
        toReturn = true;
    }
    return toReturn;
  }

  /** émission de la valeur vers le parent */
  change(event: Event) {
    if (this.listSelect) this.value = event;
    if (this.valueModifiy && this.verifValue()) {
      this.valueEmit.emit({ value: this.value, id: this.id });
    }
    if (this.resetWhenSubmitted) {
      this.value = undefined;
      this.addNewElement = true;
    }
  }

  /** annulation via touche escape */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydown(event: KeyboardEvent) {
    this.verifValue();
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
        this.verifValue();
      }
    }
    if (this.listSelect) {
      if (!this.listSelect.nativeElement.contains(event.target)) {
        this.verifValue();
      }
    }
  }
  /** on gère le double clic sur les champs */
  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: MouseEvent) {
    this.valueModifiy = true;
  }
}
