import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ReservationService} from "../shared/services/reservation.service";
import {Vehicle} from "../shared/models/vehicle";
import {Assurance} from "../shared/models/assurance";
import {Supplement} from "../shared/models/supplement";
import {Reservation} from "../shared/models/reservation";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit{
    @Input() currentReservation?: Reservation;

    currentStep: number = 2;
    vehicles: Vehicle[] = [];
    assurances: Assurance[] = [];
    supplements: Supplement[] = [];

  constructor(
      private reservationService: ReservationService
  ) {}
    ngOnInit() {
        this.reservationService.getVehicles().subscribe(
            (vehicles: any) => {
                this.vehicles = vehicles;
            },
            (error) => {
                console.error('Une erreur s\'est produite :', error);
            }
        );
        this.reservationService.getSupplements().subscribe(
            (supplements: any) => {
                this.supplements = supplements;
            },
            (error) => {
                console.error('Une erreur s\'est produite :', error);
            }
        );
        this.reservationService.getAssurances().subscribe(
            (assurances: any) => {
                this.assurances = assurances;
            },
            (error) => {
                console.error('Une erreur s\'est produite :', error);
            }
        );
    }
}
