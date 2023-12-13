import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
      private http: HttpClient
  ) { }

  getAllStations() {
    return this.http.get('http://localhost:3000/station');
  }

  getStationById(id: string) {
    return this.http.get('http://localhost:3000/station?id=' + id);
  }
}