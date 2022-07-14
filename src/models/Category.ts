export class Category {
    id: number | null;
    category: string;

    constructor(id: number | null, category: string) {
        this.id = id;
        this.category = category;
    }
}