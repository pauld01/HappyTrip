import { Pipe, PipeTransform } from '@angular/core';
import {ReservationService} from "../services/reservation.service";

@Pipe({
    name: 'carType',
    standalone: true
})
export class CarTypePipe implements PipeTransform {

  constructor(
      private reservationService: ReservationService
  ) {}

  transform(id: string): string {
    let carType: string = "";

    this.reservationService.getCarTypeById(id).subscribe(
        (type: any) => {
            console.log(type[0].label);
            carType = type[0].label;
        },
        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
    );
    return carType || 'Type inconnu';
  }
}