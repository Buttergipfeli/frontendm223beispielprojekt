import { User } from "../models/User";
import { Buffer } from "buffer";
import { api } from "../constants/api";
import { BehaviorSubject } from "rxjs";

const API_URL = api + '/login';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('m223-user') || ''));

export const loginService = {
    login,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value },
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