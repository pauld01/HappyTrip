export class User {
    id: string = crypto.randomUUID();
    login: string = "";
    password: string = "";
    name: string = "";
    surname: string = "";
    phone?: string;
    mail?: string;
    birthday?: string;

    constructor(
        login: string,
        password: string,
        name: string,
        surname: string,
        phone: string = "",
        mail: string = "",
        birthday: string = ""
    ) {
        this.login = login;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        if(mail === "") { this.mail = login; }
        else { this.mail = mail; }
        this.birthday = birthday
    }
}