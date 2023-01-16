import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../features/authSlice";
import { RootState } from "../store";

const BASE_URL = "http://174.138.30.99:8000/api/auth"

export const authapi = axios.create({
    baseURL: BASE_URL
});

export const authapiToken = () => {
    const TOKEN = useSelector((state: RootState) => state.auth.token);
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            authorization: "Bearer " + TOKEN,
        },
    })
};




    


