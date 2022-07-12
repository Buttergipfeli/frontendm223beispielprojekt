export class User {
    id: number | null;
    username: string;
    password: string;
    token: string;

    constructor(id: number | null, username: string, password: string, token: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.token = token;
    }
}