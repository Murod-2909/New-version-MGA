import { createSlice } from "@reduxjs/toolkit";
import { resolveInitialLanguage } from "../../serves/locale";

const initialState = {
    language: resolveInitialLanguage(),
};

const languageSlice = createSlice({
    name: "languageSlice",
    initialState,
    reducers: {
        languageChange: (state, { payload }) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem("language", payload);
            }
            state.language = payload;
        },
    },
});

export const { languageChange } = languageSlice.actions;

export default languageSlice.reducer;
