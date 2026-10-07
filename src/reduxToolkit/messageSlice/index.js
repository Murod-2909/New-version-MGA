import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { SEND_CONTACT, SEND_EMAIL } from "../../serves/api/utilis";

const requestConfig = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

// Rejections carry { status, data } (the HTTP status and the backend's field errors)
// so callers can tell a validation problem (400) from rate limiting (429).
const post = (url) => async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(url, payload, requestConfig);
    return response.data;
  } catch (error) {
    return rejectWithValue({
      status: error.response?.status ?? null,
      data: error.response?.data ?? null,
    });
  }
};

export const sendContact = createAsyncThunk("sendContact", post(SEND_CONTACT));

export const sendEmail = createAsyncThunk("sendEmail", post(SEND_EMAIL));
