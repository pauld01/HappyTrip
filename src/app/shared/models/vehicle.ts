// @ts-ignore
import crypto from "crypto";
import {CarType} from "./car-type";
import {VehicleType} from "./vehicle-type";

export class Vehicle {
    id: string = crypto.randomUUID();
    type: VehicleType;
    carType: CarType;
    long_name: string;
    brand: string;
    model: string;
    year_model: string;
    power: string;
    characteristics?: [{seating_places: number, doors: number, gearbox: string, bags: number}];
    picture?: string;
    price: number;

    constructor(type: VehicleType, carType: CarType, long_name: string, brand: string, model: string, year_model: string, power: string, price: number) {
        this.type = type;
        this.carType = carType;
        this.long_name = long_name;
        this.brand = brand;
        this.model = model;
        this.year_model = year_model;
        this.power = power;
        this.price = price;
    }
}