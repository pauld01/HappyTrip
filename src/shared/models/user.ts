import crypto from "crypto";

export class User {
    id: string = crypto.randomUUID();
    login: string = "";
    password: string = "";
    name: string = "";
    surname: string = "";
    phone?: string;
    mail?: string;

    constructor() {  }

    getFullname(){
        return this.surname[0].toLocaleUpperCase() + this.surname.substr(1).toLowerCase() + " " + this.name.toUpperCase();
    }
}