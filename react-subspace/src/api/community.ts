import axios from "axios";
import { BASE_URL } from "./api";


export const communityapi = axios.create({
    baseURL: BASE_URL.COMMUNITY
});

export const communityapiToken = (token: string) => axios.create({
    baseURL: BASE_URL.COMMUNITY,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});