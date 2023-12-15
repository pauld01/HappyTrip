import {Component, Input} from '@angular/core';
import {Assurance} from "../../shared/models/assurance";
import { Reservation } from '../../shared/models/reservation';
import {ReservationService} from "../../shared/services/reservation.service";
import {NgForOf} from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { Supplement } from '../../shared/models/supplement';
@Component({
  selector: 'app-select-extras',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './select-extras.component.html',
  styleUrl: './select-extras.component.scss'
})
export class SelectExtrasComponent {
  @Input() assurancesList: Assurance[] = [];
  @Input() supplementsList: Supplement[] = [];
  @Input() reservation!: Reservation;

  reservationId!: string | null;

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


  selectExtras(supplementId: string) {
    if (!this.reservation.supplements) {
      this.reservation.supplements = [];
    }
    this.reservation.supplements.push(supplementId as never);
    this.reservationService.updateReservation(this.reservation);
  }

  

  selectAssurance(idAssurance: string | null) {
    if (idAssurance) {
      this.reservation.assurance = idAssurance;
      this.reservationService.updateReservation(this.reservation);
    }
  }
}
