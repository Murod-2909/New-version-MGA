import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_SERVICES } from "../../serves/api/utilis";

export const getServices = createAsyncThunk("services/get", async () => {
  const uiLanguage = localStorage.getItem('language') || 'en';
  // Backend only has service content in en/ru — it returns [] for lang=uz.
  // The rest of the page's text is already translated via i18n regardless
  // of what we send here, so fall back to ru for the uz UI language.
  const apiLanguage = uiLanguage === 'uz' ? 'ru' : uiLanguage;

  const response = await axios.get(`${GET_SERVICES}?lang=${apiLanguage}`, {
    headers: {
      'accept': 'application/json',
    }
  });


  return response.data;
});
