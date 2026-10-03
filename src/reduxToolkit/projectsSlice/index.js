import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_PROJECTS } from "../../serves/api/utilis";

const requestConfig = { headers: { accept: "application/json" } };
const currentLang = () => localStorage.getItem("language") || "en";

// Accept both a plain array and a DRF-paginated { results: [...] } response.
const toList = (data) => (Array.isArray(data) ? data : data?.results ?? []);

export const getProjects = createAsyncThunk("projects/getList", async () => {
  const response = await axios.get(`${GET_PROJECTS}?lang=${currentLang()}`, requestConfig);
  return toList(response.data);
});

export const getProject = createAsyncThunk(
  "projects/getOne",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${GET_PROJECTS}${encodeURIComponent(slug)}/?lang=${currentLang()}`,
        requestConfig
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ status: error.response?.status ?? null });
    }
  }
);
