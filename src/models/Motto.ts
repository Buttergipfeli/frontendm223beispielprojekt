import { Category } from "./Category";
import { User } from "./User";

export class Motto {
    id: number | null;
    categoryfk: Category;
    ownerfk: User;
    motto: string;
    price: number | null;

    constructor(id: number | null, categoryfk: Category, ownerfk: User, motto: string, price: number | null) {
        this.id = id;
        this.categoryfk = categoryfk;
        this.ownerfk = ownerfk;
        this.motto = motto;
        this.price = price;
    }
}