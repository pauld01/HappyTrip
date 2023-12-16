import {User} from "./user";

export class Reservation {
    id: string = crypto.randomUUID();
    user: String;
    vehicle: string;
    assurance: string;
    supplements: [];
    station_departure: string;
    station_arrival: string;
    date_departure: string;
    date_arrival: string;
    pilot: User | [{name: string, surname: string, birthday: string, mail: string, phone: string}] = [{
        "name": "",
        "surname": "",
        "birthday": "",
        "mail": "",
        "phone": ""
    }];
    payment: boolean = false;

    constructor(userId: String, vehicleId: string, assuranceId: string, supplements: [], station_departure: string, station_arrival: string, date_departure: string, date_arrival: string) {
        this.user = userId;
        this.vehicle = vehicleId;
        this.assurance = assuranceId;
        this.supplements = supplements;
        this.station_departure = station_departure;
        this.station_arrival = station_arrival;
        this.date_departure = date_departure;
        this.date_arrival = date_arrival;
        
    }
}