import axios from "axios";
import { BASE_URL, BASE_URL_DEV } from "./api";


export const communityapi = axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY = 'local' ? BASE_URL_DEV.COMMUNITY : BASE_URL.COMMUNITY,
});

export const communityapiToken = (token: string) => axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY = 'local' ? BASE_URL_DEV.COMMUNITY : BASE_URL.COMMUNITY,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});