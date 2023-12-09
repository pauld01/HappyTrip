import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
      private http: HttpClient
  ) {}

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/reservations');
  }

  getReservationsOfUser(user: User) {
    return this.http.get<any[]>('http://localhost:3000/reservations?user=' + user.id);
  }

  addReservation(reservation: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/reservations', reservation);
  }

  getAssurances(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/assurance');
  }
}
