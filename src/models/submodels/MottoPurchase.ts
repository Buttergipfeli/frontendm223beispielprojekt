import { Motto } from "../Motto";

export class MottoPurchase {
    wallet: number;
    motto: Motto;

    constructor(wallet: number, motto: Motto) {
        this.wallet = wallet;
        this.motto = motto;
    }
}