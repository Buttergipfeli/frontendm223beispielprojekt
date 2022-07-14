import { api } from "../constants/api";
import { Category } from "../models/Category";
import { loginService } from "./login.service";

const API_URL = api + '/categories';

export const categoryService = {
    getCategories
}

let token;
loginService.currentUser.subscribe(data => {
    token = (data ? data.token : '');
});
const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
}

async function getCategories(): Promise<Category[] | null> {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers
    });
    if (response.status === 200) {
        const data: Category[] = await response.json();
        return data;
    }
    return null;
}