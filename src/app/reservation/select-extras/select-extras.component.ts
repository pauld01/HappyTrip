import {Component, Input} from '@angular/core';
import {Assurance} from "../../shared/models/assurance";
import {NgForOf, NgIf} from "@angular/common";
import {Reservation} from "../../shared/models/reservation";
import {ReservationService} from "../../shared/services/reservation.service";
import {Supplement} from "../../shared/models/supplement";

@Component({
  selector: 'app-select-extras',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './select-extras.component.html',
  styleUrl: './select-extras.component.scss'
})
export class SelectExtrasComponent {
  @Input() assurances: Assurance[] = [];
  @Input() extras: Supplement[] = [];
  @Input() reservation!: Reservation;

  selectedExtras: string[] = [];

  constructor(
      private reservationService: ReservationService
  ) {}

  selectAssurance(assuranceId: string) {
    this.reservation.assurance = assuranceId;
  }

  toggleExtraSelection(extraId: string): void {
    const index = this.selectedExtras.indexOf(extraId);
    if (index === -1) { this.selectedExtras.push(extraId); }
    else { this.selectedExtras.splice(index, 1); }
  }

  goToNextStep() {
    this.reservation.supplements = this.selectedExtras;
    this.reservationService.updateReservation(this.reservation);
  }
}