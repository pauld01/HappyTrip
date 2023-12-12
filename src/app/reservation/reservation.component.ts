import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  currentStep: number = 1;

  goToNextStep(): void {
      this.currentStep++;
  }

  goToPreviousStep(): void {
      this.currentStep--;
  }
}
