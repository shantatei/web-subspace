import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Community } from "../utils/types";


interface CommunityState {
    communities: Array<Community>
}

const initialState: CommunityState = {
    communities: []
};

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
        SetCommunity: (state, action: PayloadAction<Array<Community>>) => {
            state.communities = action.payload;
        }
    },
});

const { reducer, actions } = communitySlice

export const { SetCommunity } = actions

export default reducer