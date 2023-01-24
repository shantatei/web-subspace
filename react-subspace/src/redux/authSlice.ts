import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from "../utils/types";


export interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
    token: string;
    user?: User;
}

const initialState: AuthState = {
    isLoading: false,
    isAuth: false,
    token: '',
    user: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginNotPending: (state) => {
            state.isLoading = false;
        },
        loginPending: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action: PayloadAction<AuthState>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        loginFail: (state) => {
            state.isLoading = false;
        },
        logoutSuccess: (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.token = '';
            state.user = undefined
        }
    },
});

const { reducer, actions } = authSlice

export const { loginNotPending, loginPending, loginSuccess, loginFail, logoutSuccess } = actions

export default reducer