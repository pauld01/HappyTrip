import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Assurance} from "../../shared/models/assurance";
import {NgForOf, NgIf} from "@angular/common";
import {Reservation} from "../../shared/models/reservation";
import {ReservationService} from "../../shared/services/reservation.service";
import {Supplement} from "../../shared/models/supplement";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisableOtherCheckboxesDirective } from '../../directives/disable-other-checkboxes.directive';
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
  @Output() changeOnglet: EventEmitter<void> = new EventEmitter<void>();

  @Input() assurancesList: Assurance[] = [];
  @Input() supplementsList: Supplement[] = [];
  @Input() reservation!: Reservation;
  selectedAssuranceId: string | null = null;
  selectedSupplementId: string | null = null;
  reservationId!: string | null;
  assurancesForm = new FormGroup({});
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
    this.changeOnglet.emit();
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
}