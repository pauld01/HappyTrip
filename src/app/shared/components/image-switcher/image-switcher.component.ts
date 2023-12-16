import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-image-switcher',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './image-switcher.component.html',
  styleUrl: './image-switcher.component.scss'
})
export class ImageSwitcherComponent {
  @Output() autoClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() utilitaireClicked: EventEmitter<void> = new EventEmitter<void>();

  vehiculeType: number = 1;

  onAutoButtonClick(): void {
    this.autoClicked.emit();
    this.vehiculeType = 1;
  }

  onUtilitaireButtonClick(): void {
    this.utilitaireClicked.emit();
    this.vehiculeType = 2;
  }
}