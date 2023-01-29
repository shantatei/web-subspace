import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post } from "../utils/types";


export interface PostState {
    post: Array<Post>
}

const initialState: PostState = {
    post: []
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        SetPost: (state, action: PayloadAction<Array<Post>>) => {
            state.post = action.payload;
        }
    },
});

const { reducer, actions } = postSlice

export const { SetPost } = actions

export default reducer