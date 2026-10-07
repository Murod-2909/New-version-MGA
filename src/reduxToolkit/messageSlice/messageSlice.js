import { createSlice } from "@reduxjs/toolkit";

import { sendContact, sendEmail } from "./index";

const initialState = {
  loading: false,
  sendEmailData: null,
  sendEmailLoading: true,
  sendContactData: null,
  sendContactLoading: true,
  error: null,
};

const senQuestion = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContact: (state) => {
      state.sendFullData = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(sendContact.pending, (state) => {
        state.sendFullLoading = true;
      })
      .addCase(sendContact.fulfilled, (state, action) => {
        state.sendContactLoading = false;
        state.sendContactData = action.payload;
      })
      .addCase(sendContact.rejected, (state, action) => {
        state.sendContactLoading = false;
        state.error = action.error.message;
      });
    build
      .addCase(sendEmail.pending, (state) => {
        state.sendEmailLoading = true;
        state.error = null;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.sendEmailLoading = false;
        state.sendEmailData = action.payload;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.sendEmailLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetContact } = senQuestion.actions;
export default senQuestion.reducer;
