export class Role {
    id: number | null;
    role: string;

    constructor(id: number | null, role: string) {
        this.id = id;
        this.role = role;
    }
}