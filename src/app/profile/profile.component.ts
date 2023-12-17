import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ReservationService} from "../shared/services/reservation.service";
import {User} from "../shared/models/user";
import {Reservation} from "../shared/models/reservation";
import {Router} from "@angular/router";
import {map, Observable} from 'rxjs';
import { Vehicle } from '../shared/models/vehicle';
import {SearchService} from "../shared/services/search.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  onglet: number = 1;
  currentUser: User | undefined;
  userReservations: Reservation[] = [];
  reservation!: Reservation;
  stationDeparture?: Observable<string>;
  stationArrival?: Observable<string>;
  stationDepartureName: string = "";
  stationArrivalName: string = "";
  vehicle!: Observable<Vehicle>;
  vehicleInformations!: Vehicle;

  constructor(
      private authService: AuthService,
      private reservationService: ReservationService,
      private searchService: SearchService,
      private router: Router
  ) {}

  ngOnInit() {
    this.authService.getSavedUserInfo().subscribe(
        (user: any) => {
          this.currentUser = user[0];
          this.loadUserReservations();
        },
        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
    );
  }

  loadUserReservations() {
    if (this.currentUser) {
      this.reservationService.getReservationsOfUser(this.currentUser).subscribe(
          (reservations: any) => {
            this.userReservations = reservations;
          },
          (error) => {
            console.error('Une erreur s\'est produite :', error);
          }
      );
    } else {
      console.warn('currentUser is undefined. Cannot load user reservations.');
    }
  }

  getStationNames(){
    this.stationDeparture =  this.searchService.getStationById(this.reservation.station_departure).pipe(
        map((station: any) => (station && station.length > 0) ? station[0].name : 'Nom inconnu')
    );
    this.stationArrival =  this.searchService.getStationById(this.reservation.station_departure).pipe(
        map((station: any) => (station && station.length > 0) ? station[0].name : 'Nom inconnu')
    );

    this.stationDeparture.subscribe((stationName: string) => {
       this.stationDepartureName = stationName
    });

    this.stationArrival.subscribe((stationName: string) => {
        this.stationArrivalName = stationName
    });
}

getVehiculeInformations(){
  if(this.reservation.vehicle != "") {
      this.vehicle =  this.reservationService.getVehicleById(this.reservation.vehicle).pipe(
          map((vehicle: any) => (vehicle && vehicle.length > 0) ? vehicle[0] : undefined)
      );

      this.vehicle.subscribe((vehicule: Vehicle) => {
          this.vehicleInformations = vehicule
      });
  }

}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}