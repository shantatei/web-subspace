import axios from "axios";
import { BASE_URL, BASE_URL_DEV } from "./api";


export const commentapi = axios.create({
    baseURL: BASE_URL.COMMENT
});

export const commentapiDev = axios.create({
    baseURL: BASE_URL_DEV.COMMENT
});

export const commentapiToken = (token: string) => axios.create({
    baseURL: BASE_URL.COMMENT,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});

export const commentapiDevToken = (token: string) => axios.create({
    baseURL: BASE_URL.COMMENT,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});