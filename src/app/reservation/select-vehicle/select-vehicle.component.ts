import {Component, Input} from '@angular/core';
import {Vehicle} from "../../shared/models/vehicle";
import {NgForOf} from "@angular/common";
import {CarTypePipe} from "../../shared/pipes/car-type.pipe";
import {ReservationService} from "../../shared/services/reservation.service";
import {ActivatedRoute} from "@angular/router";
import {Reservation} from "../../shared/models/reservation";

@Component({
  selector: 'app-select-vehicle',
  standalone: true,
  imports: [
    NgForOf,
    CarTypePipe
  ],
  templateUrl: './select-vehicle.component.html',
  styleUrl: './select-vehicle.component.scss'
})
export class SelectVehicleComponent {
  @Input() vehicleList: Vehicle[] = [];
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

  selectVehicle(vehicleId: string) {
    this.reservation.vehicle = vehicleId;
    this.reservationService.updateReservation(this.reservation);
  }

}
