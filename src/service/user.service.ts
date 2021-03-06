import { api } from "../constants/api"
import { User } from "../models/User";
import { loginService } from "./login.service";

const API_URL = api + '/users';

export const userService = {
    getUserById,
    updatePassword,
    getAllUsers,
    updateWallet,
    findUserById,
    deleteUserById
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
    const response = await fetch(API_URL + "/" + user.id, {
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

async function getAllUsers(): Promise<User[] | null> {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers
    });
    if (!response.ok) {
        return null;
    }
    const data: User[] = await response.json();
    return data;
}

async function findUserById(id: number): Promise<User | null> {
    const response = await fetch(API_URL + '/' + id, {
        method: 'GET',
        headers: headers
    });
    if (!response.ok) {
        return null;
    }
    const data: User = await response.json();
    return data;
}

function updateWallet(newWallet: number): void {
    let user = loginService.currentUserValue;
    user.wallet = newWallet;
    localStorage.setItem('m223-user', JSON.stringify(user));
}

async function deleteUserById(id: number): Promise<User | null> {
    const response = await fetch(API_URL + '/' + id, {
        method: 'DELETE',
        headers: headers
    });
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}