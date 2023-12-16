
export class Assurance {
    id: string = crypto.randomUUID();
    label: string = "";
    price?: number;
    caution?: number;
    protections: number[] = [];
    include: number[] = [];
    absent: number[] = [];
}