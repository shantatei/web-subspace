import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Comment } from "../utils/types";

interface CommentState {
    comments: Array<Comment>
}

interface EditCommentValues {
    comment_id: number;
    text: string;
}

const initialState: CommentState = {
    comments: []
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setComment: (state, action: PayloadAction<Array<Comment>>) => {
            state.comments = action.payload;
        },
        editComment: (state, action: PayloadAction<EditCommentValues>) => {
            const commentIndex = state.comments.findIndex(
                (comment) => comment.id === action.payload.comment_id
            )
            state.comments[commentIndex].text = action.payload.text;
        },
        deleteComment: (state, action: PayloadAction<number | null>) => {
            const filteredcomments = state.comments.filter(
                (comment) => comment.id !== action.payload
            );
            state.comments = filteredcomments;
        },
    },
});

const { reducer, actions } = commentSlice

export const { setComment, deleteComment, editComment } = actions

export default reducer