import axios from "axios";
import { BASE_URL } from "./api";


export const postapi = axios.create({
    baseURL: BASE_URL.POST
});

export const postapiToken = (token: string) => axios.create({
    baseURL: BASE_URL.POST,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});