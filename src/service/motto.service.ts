import { Motto } from "../models/Motto";
import { api } from "../constants/api";
import { loginService } from "./login.service";

const API_URL = api + '/mottos';

export const mottoService = {
    createMotto,
    getAllMottos
}

let token;
loginService.currentUser.subscribe(data => {
    token = (data ? data.token : '');
});
const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
}

async function createMotto(motto: Motto): Promise<Motto | null> {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(motto),
        headers: headers
    });
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

async function getAllMottos(): Promise<Motto[] | null> {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers
    })
    if (!response.ok) {
        return null;
    }
    const data: Motto[] = await response.json();
    return data;
}