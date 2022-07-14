import { api } from "../constants/api";
import { Category } from "../models/Category";

const API_URL = api + '/categories';

export const categoryService = {
    getCategories
}

async function getCategories(): Promise<Category[] | null> {
    const response = await fetch(api + '/categories', {
        method: 'GET',
    });
    if (response.status === 200) {
        const data: Category[] = await response.json();
        return data;
    }
    return null;
}