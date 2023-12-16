import {Component, Input} from '@angular/core';
import {Assurance} from "../../shared/models/assurance";
import {NgForOf, NgIf} from "@angular/common";
import {Reservation} from "../../shared/models/reservation";
import {ReservationService} from "../../shared/services/reservation.service";
import {Supplement} from "../../shared/models/supplement";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisableOtherCheckboxesDirective } from '../../directives/disable-other-checkboxes';
import { DisableOthersDirective } from '../../directives/disable-others.directive';

@Component({
  selector: 'app-select-extras',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DisableOthersDirective,
    ReactiveFormsModule,
    DisableOtherCheckboxesDirective
  ],
  templateUrl: './select-extras.component.html',
  styleUrl: './select-extras.component.scss'
})
export class SelectExtrasComponent {
  @Input() assurancesList: Assurance[] = [];
  @Input() supplementsList: Supplement[] = [];
  @Input() reservation!: Reservation;
  selectedAssuranceId: string | null = null;
  selectedSupplementId: string | null = null;
  reservationId!: string | null;
  assurancesForm = new FormGroup({});
  //selectedExtras: string[] = [];
  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
) {
  this.route.paramMap.subscribe(
      (params) => {
        this.reservationId = params.get('idReservation');
      }
  );
}


  goToNextStep() {
    this.selectAssurance();
    this.selectSupplement();
  }

  private selectAssurance() {
    if (this.selectedAssuranceId) {
      this.reservation.assurance = this.selectedAssuranceId;
      this.reservationService.updateReservation(this.reservation);
    }
  }

  private selectSupplement() {
    if (this.selectedSupplementId) {
      this.reservation.supplements.push(this.selectedSupplementId as never);
      this.reservationService.updateReservation(this.reservation);
    }
  }
  

  onAssuranceSelected(id: string) {
    this.selectedAssuranceId = id;
  }

  onSupplementSelected(id: string) {
    this.selectedSupplementId = id;
  }
  // toggleExtraSelection(extraId: string): void {
  //   const index = this.selectedExtras.indexOf(extraId);
  //   if (index === -1) { this.selectedExtras.push(extraId); }
  //   else { this.selectedExtras.splice(index, 1); }
  // }

  // goToNextStep() {
  //   this.reservation.supplements = this.selectedExtras;
  //   this.reservationService.updateReservation(this.reservation);
  // }



}