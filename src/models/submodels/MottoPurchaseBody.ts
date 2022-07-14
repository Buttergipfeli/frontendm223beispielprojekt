import { Motto } from "../Motto";

export class MottoPurchaseBody {
    mottoId: number;

    constructor(mottoId: number) {
        this.mottoId = mottoId;
    }
}