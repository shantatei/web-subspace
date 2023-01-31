import axios from "axios";
import { BASE_URL, BASE_URL_DEV } from "./api";


export const commentapi = axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY = 'local' ? BASE_URL_DEV.COMMENT : BASE_URL.COMMENT
});

export const commentapiToken = (token: string) => axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY = 'local' ? BASE_URL_DEV.COMMENT : BASE_URL.COMMENT,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});
