import { api } from "../constants/api"
import { User } from "../models/User";
import { loginService } from "./login.service";

const API_URL = api + '/users';

export const userService = {
    getUserById,
    updatePassword
}

let token;
loginService.currentUser.subscribe(data => {
    token = (data ? data.token : '');
});
const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
}

async function getUserById(id: number): Promise<User | null> {
    const response = await fetch(API_URL + '/' + id, {
        method: 'GET',
        headers: headers
    });
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

async function updatePassword(user: User): Promise<User | null> {
    const response = await fetch(API_URL, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: headers
    });
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}