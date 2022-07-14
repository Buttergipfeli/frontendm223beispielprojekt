import { api } from "../constants/api";
import { loginService } from "./login.service";
import { MottoPurchase } from '../models/submodels/MottoPurchase';
import { MottoPurchaseBody } from "../models/submodels/MottoPurchaseBody";

const API_URL = api + "/mottopurchases";

export const mottoPurchaseService = {
    purchaseMotto
}

let token;
loginService.currentUser.subscribe(data => {
    token = (data ? data.token : '');
});
const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
}

async function purchaseMotto(mottoPuchaseBoy: MottoPurchaseBody): Promise<string | MottoPurchase> {
    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(mottoPuchaseBoy),
        headers: headers
    });
    if (response.status === 404) {
        return "Motto not found";
    }
    if (response.status === 412) {
        return "Not enough money in your wallet";
    }
    if (!response.ok) {
        return "unexpected error on purchase";
    }
    const data = response.json();
    return data;
}