import { Role } from "./Role";

export class User {
    id: number | null;
    rolefk: Role;
    username: string;
    password: string;
    token: string;

    constructor(id: number | null, rolefk: Role, username: string, password: string, token: string) {
        this.id = id;
        this.rolefk = rolefk;
        this.username = username;
        this.password = password;
        this.token = token;
    }
}