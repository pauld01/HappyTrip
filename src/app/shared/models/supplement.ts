export class Supplement {
    id: string = crypto.randomUUID();
    label: string = "";
    subLabel?: string;
    description?: string;
    price?: number;
    picture?:string;
}