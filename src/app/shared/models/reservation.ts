import {User} from "./user";
import {Vehicle} from "./vehicle";
import {Assurance} from "./assurance";
import {Supplement} from "./supplement";
import {Station} from "./station";

export class Reservation {
    id: string = crypto.randomUUID();
    user: User;
    vehicle: Vehicle;
    assurance: Assurance;
    supplements: Supplement[];
    station_departure: Station;
    station_arrival: Station;
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

    constructor(user: User, vehicle: Vehicle, assurance: Assurance, supplements: Supplement[], station_departure: Station, station_arrival: Station, date_departure: string, date_arrival: string) {
        this.user = user;
        this.vehicle = vehicle;
        this.assurance = assurance;
        this.supplements = supplements;
        this.station_departure = station_departure;
        this.station_arrival = station_arrival;
        this.date_departure = date_departure;
        this.date_arrival = date_arrival;
    }
}