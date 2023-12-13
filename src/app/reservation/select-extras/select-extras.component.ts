import {Component, Input} from '@angular/core';
import {Assurance} from "../../shared/models/assurance";

@Component({
  selector: 'app-select-extras',
  standalone: true,
  imports: [],
  templateUrl: './select-extras.component.html',
  styleUrl: './select-extras.component.scss'
})
export class SelectExtrasComponent {
  @Input() assurances: Assurance[] = [];

}
