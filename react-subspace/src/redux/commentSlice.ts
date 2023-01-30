import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Comment } from "../utils/types";


export interface CommentState {
    comments: Array<Comment>
}

const initialState: CommentState = {
    comments: []
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        SetComment: (state, action: PayloadAction<Array<Comment>>) => {
            state.comments = action.payload;
        }
    },
});

const { reducer, actions } = commentSlice

export const { SetComment } = actions

export default reducer