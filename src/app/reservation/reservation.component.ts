import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ReservationService} from "../shared/services/reservation.service";
import {Vehicle} from "../shared/models/vehicle";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit{
  currentStep: number = 1;
  vehicles: Vehicle[] = [];

  constructor(
      private authService: AuthService,
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
    }
}
