import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getReservationsOfUser(user: User) {
    return this.http.get('http://localhost:3000/reservation?user=' + user.id);
  }

  addReservation(reservation: Reservation) {
    return this.http.post('http://localhost:3000/reservation', reservation);
  }

  getAssurances() {
    return this.http.get('http://localhost:3000/assurance');
  }

  getVehicles() {
    return this.http.get('http://localhost:3000/vehicle');
  }
}