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
        },
        deleteComment: (state, action: PayloadAction<number | null>) => {
            const filteredcomments = state.comments.filter(
                (comment) => comment.id !== action.payload
            );
            state.comments = filteredcomments;
        }
    },
});

const { reducer, actions } = commentSlice

export const { SetComment, deleteComment } = actions

export default reducer