import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../models/user";
import {Reservation} from "../models/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
      private http: HttpClient
  ) {}

  getReservations(){
    return this.http.get('http://localhost:3000/reservation');
  }

  getReservationsById(id :string){
    return this.http.get('http://localhost:3000/reservation?id=' + id);
  }

  getReservationsOfUser(user: User) {
    return this.http.get('http://localhost:3000/reservation?user=' + user.id);
  }

  addReservation(reservation: Reservation) {
    return this.http.post('http://localhost:3000/reservation', reservation).subscribe();
  }

  updateReservation(reservation: Reservation) {
    return this.http.put<Reservation>('http://localhost:3000/reservation/'+reservation.id, reservation).subscribe();
  }

  getAssurances() {
    return this.http.get('http://localhost:3000/assurance');
  }

  getAssurancesById(id: string) {
    return this.http.get('http://localhost:3000/assurance?id=' + id);
  }

  getVehicles() {
    return this.http.get('http://localhost:3000/vehicle');
  }

  getVehicleById(id :string) {
    return this.http.get('http://localhost:3000/vehicle?id=' + id);
  }

  getSupplements() {
    return this.http.get('http://localhost:3000/supplement');
  }

  getCarType() {
    return this.http.get('http://localhost:3000/carType');
  }

  getCarTypeById(id: string) {
    return this.http.get('http://localhost:3000/carType?id=' + id);
  }

  getPromotionCodeByCode(code: string) {
    return this.http.get('http://localhost:3000/promotionCode?code=' + code);
  }
}