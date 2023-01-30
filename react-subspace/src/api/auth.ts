import axios from "axios";
import { BASE_URL, BASE_URL_DEV } from "./api";


export const authapi = axios.create({
    baseURL: BASE_URL.AUTH
});

export const authapiDev = axios.create({
    baseURL: BASE_URL_DEV.AUTH
});

export const authapiToken = (token: string) => axios.create({
    baseURL: BASE_URL.AUTH,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});









