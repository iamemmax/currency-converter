import { API_HOST, API_KEY } from "../../environment";

export const config = {
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
    }
}