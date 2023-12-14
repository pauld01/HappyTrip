import { Pipe, PipeTransform } from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {map} from "rxjs";

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

      this.reservationService.getCarTypeById(id).pipe(
              map((type: any) => (type && type.length > 0) ? type[0].label : 'Type Inconnu')
      ).subscribe((typeName: string) => {
         carType = typeName;
         return carType;
      });
    return carType || 'Type inconnu';
  }
}