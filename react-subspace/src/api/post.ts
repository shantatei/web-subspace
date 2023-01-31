import axios from "axios";
import { BASE_URL ,BASE_URL_DEV} from "./api";

export const postapi = axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY= 'local' ? BASE_URL_DEV.POST : BASE_URL.POST,
});

export const postapiToken = (token: string) => axios.create({
    baseURL: import.meta.env.VITE_ENVIRONMENT_KEY= 'local' ? BASE_URL_DEV.POST : BASE_URL.POST,
    headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
    },
});