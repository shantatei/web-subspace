import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
    searchTerm: string
    isQuery: boolean
}

const initialState: SearchState = {
    searchTerm: "",
    isQuery: false
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
            state.isQuery = true
        },
        resetSearch: (state) => {
            state.searchTerm = "";
            state.isQuery = false
        },
    },
});

const { reducer, actions } = searchSlice

export const { setSearch, resetSearch } = actions

export default reducer