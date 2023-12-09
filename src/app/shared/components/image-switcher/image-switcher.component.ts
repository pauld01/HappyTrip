import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-image-switcher',
  standalone: true,
  imports: [],
  templateUrl: './image-switcher.component.html',
  styleUrl: './image-switcher.component.scss'
})
export class ImageSwitcherComponent {
  @Output() autoClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() utilitaireClicked: EventEmitter<void> = new EventEmitter<void>();

  onAutoButtonClick(): void {
    this.autoClicked.emit();
  }

  onUtilitaireButtonClick(): void {
    this.utilitaireClicked.emit();
  }
}
