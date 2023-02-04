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
        setPost: (state, action: PayloadAction<Array<Post>>) => {
            state.post = action.payload;
        },
        deletePost: (state, action: PayloadAction<number | null>) => {
            const filteredpost = state.post.filter(
                (post) => post.id !== action.payload
            );
            state.post = filteredpost;
        },
    },
});

const { reducer, actions } = postSlice

export const { setPost ,deletePost } = actions

export default reducer