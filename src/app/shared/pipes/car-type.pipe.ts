import {Pipe, PipeTransform} from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {CarType} from "../models/car-type";

@Pipe({
    name: 'carType',
    standalone: true
})
export class CarTypePipe implements PipeTransform{
    carTypeList: CarType[] = [];

  constructor(
      private reservationService: ReservationService
  ) {
      this.reservationService.getCarType().subscribe(
          (carTypes: any) => {
              this.carTypeList = carTypes;
          },
          (error) => {
              console.error('Une erreur s\'est produite :', error);
          }
      );
  }
    transform(id: string): string {
        let carType: string = "";

        switch (id) {
            case "1":
                carType = "Véhicule économique";
                break;
            case "2":
                carType = "Véhicule compact";
                break;
            case "3":
                carType = "Véhicule SUV Compact";
                break;
            case "4":
                carType = "Véhicule SUV";
                break;
            case "5":
                carType = "Véhicule Premium";
                break;
            case "6":
                carType = "Véhicule Luxe";
                break;
            default:
                carType = "Type inconnu";
                break;
        }
        return carType;
    }

}