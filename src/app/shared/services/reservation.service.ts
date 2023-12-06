
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservations';
  private apiUrlAssurances = 'http://localhost:3000/assurance';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservation);
  }

  getAssurances(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlAssurances);
  }
}
