import { Role } from "./Role";

export class User {
    id: number | null;
    rolefk: Role;
    username: string;
    password: string;
    token: string;
    wallet: number | null;

    constructor(id: number | null, rolefk: Role, username: string, password: string, token: string, wallet: number | null) {
        this.id = id;
        this.rolefk = rolefk;
        this.username = username;
        this.password = password;
        this.token = token;
        this.wallet = wallet;
    }
}