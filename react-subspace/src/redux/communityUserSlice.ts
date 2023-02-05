import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { CommunityUser } from "../utils/types";


interface CommunityUserState {
    communityUser: Array<CommunityUser>
}

const initialState: CommunityUserState = {
    communityUser: []
};

const communitySlice = createSlice({
    name: "communityUser",
    initialState,
    reducers: {
        setCommunityUser: (state, action: PayloadAction<Array<CommunityUser>>) => {
            state.communityUser = action.payload;
        },
        resetCommunityUser: (state) => {
            state.communityUser = []
        }

    },
});

const { reducer, actions } = communitySlice

export const { setCommunityUser, resetCommunityUser } = actions

export default reducer