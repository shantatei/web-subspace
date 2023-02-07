import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from "../utils/types";

interface UserState {
    user: User | undefined
}

const initialState: UserState = {
    user: {
        id: 0,
        username: "",
        profile_image_url: "",
        profile_image_filename: "",
        email: ""
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload;
        },
    },
});

const { reducer, actions } = userSlice

export const { setUser } = actions

export default reducer