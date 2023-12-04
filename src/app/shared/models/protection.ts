// @ts-ignore
import crypto from "crypto";

export class Protection {
    id: string = crypto.randomUUID();
    label: string = "";
}