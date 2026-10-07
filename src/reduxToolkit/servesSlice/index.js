import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_SERVICES } from "../../serves/api/utilis";

const fetchServices = async (lang) => {
  const response = await axios.get(`${GET_SERVICES}?lang=${lang}`, {
    headers: {
      'accept': 'application/json',
    }
  });
  return response.data;
};

// The menu, the page and the home section all ask for the services at about the same
// time; only one request goes out and they all read the shared result.
let inFlight = false;

export const getServices = createAsyncThunk(
  "services/get",
  async () => {
  inFlight = true;
  try {
  const language = localStorage.getItem('language') || 'en';
  const data = await fetchServices(language);

  // A backend that doesn't have Uzbek content yet (e.g. production before the
  // uz release is deployed) answers lang=uz with []. Fall back to ru so the
  // list isn't empty; once the backend serves uz this branch never runs.
  if (language === 'uz' && Array.isArray(data) && data.length === 0) {
    return fetchServices('ru');
  }

  return data;
  } finally {
    inFlight = false;
  }
  },
  { condition: () => !inFlight }
);
