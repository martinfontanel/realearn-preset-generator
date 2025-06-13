import { Component } from '@angular/core';
import { SmartInputComponent } from '../../common/smart-input/smart-input.component';

@Component({
  selector: 'create-vst',
  standalone: true,
  imports: [SmartInputComponent],
  templateUrl: './create-vst.component.html',
  styleUrl: './create-vst.component.scss',
})
export class CreateVstComponent {
  newVst: string[] = [];

  submitNewVst(rawVst: { value: any; id: any }) {
    const { value, id } = rawVst;
    this.newVst.push(value);
  }
}
