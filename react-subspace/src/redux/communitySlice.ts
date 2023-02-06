import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Community } from "../utils/types";


interface CommunityState {
    communities: Array<Community>
    community: Community
}

const initialState: CommunityState = {
    communities: [],
    community: {
        id: 0,
        name: "",
        about: "",
        created_at: ""
    }
};

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
        SetCommunity: (state, action: PayloadAction<Array<Community>>) => {
            state.communities = action.payload;
        },
        setSelectedCommunity: (state, action: PayloadAction<Community>) => {
            state.community = action.payload;
        }
    },
});

const { reducer, actions } = communitySlice

export const { SetCommunity ,setSelectedCommunity } = actions

export default reducer