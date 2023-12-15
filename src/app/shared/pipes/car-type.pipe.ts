import {OnInit, Pipe, PipeTransform} from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {map} from "rxjs";
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
        //const carType = this.carTypeList.find(type => type.id === id);
        //return carType ? carType.label : 'Type inconnu';
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
            default:
                carType = "Type inconnu";
                break;
        }

        return carType;

    }

}