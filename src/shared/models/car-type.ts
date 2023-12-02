import crypto from "crypto";

export class CarType {
    id: string = crypto.randomUUID();
    label: string = "";
}