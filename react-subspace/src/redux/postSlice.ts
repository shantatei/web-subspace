import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post } from "../utils/types";


interface PostState {
    post: Array<Post>
    filteredPost: Array<Post>
}

interface EditPostValues {
    post_id: number;
    text: string;
}

const initialState: PostState = {
    post: [],
    filteredPost: []
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPost: (state, action: PayloadAction<Array<Post>>) => {
            state.post = action.payload;
        },
        editPost: (state, action: PayloadAction<EditPostValues>) => {
            const postIndex = state.post.findIndex(
                (post) => post.id === action.payload.post_id
            )
            state.post[postIndex].text = action.payload.text;
        },
        deletePost: (state, action: PayloadAction<number | null>) => {
            const filteredpost = state.post.filter(
                (post) => post.id !== action.payload
            );
            state.post = filteredpost;
        },
        setFilteredPost: (state, action: PayloadAction<Array<Post>>) => {
            state.filteredPost = action.payload;
        },
        resetFilteredPost: (state) => {
            state.filteredPost = []
        },


    },
});

const { reducer, actions } = postSlice

export const { setPost, deletePost, editPost, setFilteredPost ,resetFilteredPost } = actions

export default reducer