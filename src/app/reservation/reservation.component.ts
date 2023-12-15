import {Component, OnInit} from '@angular/core';
import {ReservationService} from "../shared/services/reservation.service";
import {Vehicle} from "../shared/models/vehicle";
import {Assurance} from "../shared/models/assurance";
import {Supplement} from "../shared/models/supplement";
import {Reservation} from "../shared/models/reservation";
import {SearchService} from "../shared/services/search.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit{
    currentStep: number = 2;
    currentReservationId!: string | null;
    vehicles: Vehicle[] = [];
    assurances: Assurance[] = [];
    supplements: Supplement[] = [];
    reservation!: Reservation;

    stationDeparture?: Observable<string>;
    stationArrival?: Observable<string>;
    stationDepartureName: string = "";
    stationArrivalName: string = "";
    vehicle!: Observable<Vehicle>;
    vehicleInformations!: Vehicle;

  constructor(
      private reservationService: ReservationService,
      private searchService: SearchService,
      private route: ActivatedRoute
  ) {}
    ngOnInit() {
      this.route.paramMap.subscribe(
          (params) => {
              this.currentReservationId = params.get('idReservation');
              this.reservationService.getReservationsById(this.currentReservationId!).subscribe(
                  (reservation: any) => {
                      this.reservation = reservation[0];
                      this.getStationNames();
                      this.getVehiculeInformations();
                  },
                  (error) => {
                      console.error('Une erreur s\'est produite :', error);
                  }
              );
          }
      );

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
        this.vehicle =  this.reservationService.getVehicleById(this.reservation.vehicle).pipe(
            map((vehicle: any) => (vehicle && vehicle.length > 0) ? vehicle : undefined)
        );

        this.vehicle.subscribe((vehicule: Vehicle) => {
            this.vehicleInformations = vehicule
        });
    }
}
