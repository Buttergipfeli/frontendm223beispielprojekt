import { Category } from "./Category";
import { User } from "./User";

export class Motto {
    id: number;
    categoryfk: Category;
    ownerfk: User;
    motto: string;
    price: number;

    constructor(id: number, categoryfk: Category, ownerfk: User, motto: string, price: number) {
        this.id = id;
        this.categoryfk = categoryfk;
        this.ownerfk = ownerfk;
        this.motto = motto;
        this.price = price;
    }
}