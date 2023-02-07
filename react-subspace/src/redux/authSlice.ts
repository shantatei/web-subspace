import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from "../utils/types";


interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
    token: string;
    user?: User;
    leftCommunity: boolean,
    joinCommunity: boolean,
}

const initialState: AuthState = {
    isLoading: false,
    isAuth: false,
    token: '',
    user: undefined,
    leftCommunity: false,
    joinCommunity: false
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
            state.joinCommunity = false;
            state.leftCommunity = false
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
            state.joinCommunity = false;
            state.leftCommunity = false
            state.token = '';
            state.user = undefined
        },
        updateUser: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
        },
        setleftCommunity: (state) => {
            state.leftCommunity = true
        },
        resetLeftCommunity: (state) => {
            state.leftCommunity = false
        },
        setjoinCommunity: (state) => {
            state.joinCommunity = true
        },
        resetJoinCommunity: (state) => {
            state.joinCommunity = false
        },
    },
});

const { reducer, actions } = authSlice

export const { loginNotPending, loginPending, loginSuccess, loginFail, logoutSuccess,
    updateUser, setleftCommunity, resetLeftCommunity, setjoinCommunity, resetJoinCommunity } = actions

export default reducer