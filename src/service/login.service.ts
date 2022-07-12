import { User } from "../models/User";
import { Buffer } from "buffer";

const API_URL = 'http://localhost:8081/login';

export const loginService = {
    login,
    getUser
}

async function login(user: User): Promise<boolean> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(user.username + ':' + user.password).toString('base64')
    }
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers
    });
    if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('m223-user', JSON.stringify(data));
        return true;
    }
    return false;
}

function getUser(): User | null {
    const user = localStorage.getItem('m223-user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}