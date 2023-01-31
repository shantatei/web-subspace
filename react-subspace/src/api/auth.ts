import axios from "axios";
import { BASE_URL, BASE_URL_DEV } from "./api";

export const authapi = axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY == 'local' ? BASE_URL_DEV.AUTH : BASE_URL.AUTH
});

export const authapiToken = (token: string) => axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY == 'local' ? BASE_URL_DEV.AUTH : BASE_URL.AUTH,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});









