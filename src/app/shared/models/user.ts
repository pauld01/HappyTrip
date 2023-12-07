export class User {
    id: string = crypto.randomUUID();
    login: string = "";
    password: string = "";
    name: string = "";
    surname: string = "";
    phone?: string;
    mail?: string;

    constructor(
        login: string,
        password: string,
        name: string,
        surname: string,
        phone: string = "",
        mail: string = ""
    ) {
        this.login = login;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        if(mail === "") { this.mail = login; }
        else { this.mail = mail; }
    }

    getFullname(){
        return this.surname[0].toLocaleUpperCase() + this.surname.substr(1).toLowerCase() + " " + this.name.toUpperCase();
    }
}