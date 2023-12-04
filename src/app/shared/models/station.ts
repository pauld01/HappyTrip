import crypto from "crypto";

export class Station {
    id: string = crypto.randomUUID();
    city: string = "";
    country?: string;
    name: string = "";
    schedules = [{}];

}