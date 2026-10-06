import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_PROJECTS } from "../../serves/api/utilis";

const requestConfig = { headers: { accept: "application/json" } };
const currentLang = () => localStorage.getItem("language") || "en";

// Accept both a plain array and a DRF-paginated { results: [...] } response.
const toList = (data) => (Array.isArray(data) ? data : data?.results ?? []);

const FALLBACK_LANG = "en";

// A project that has no translation in the selected language isn't returned by
// the backend at all, so fall back to English rather than showing an empty page.
export const getProjects = createAsyncThunk("projects/getList", async () => {
  const lang = currentLang();
  const response = await axios.get(`${GET_PROJECTS}?lang=${lang}`, requestConfig);
  const list = toList(response.data);
  if (list.length > 0 || lang === FALLBACK_LANG) return list;

  const fallback = await axios.get(`${GET_PROJECTS}?lang=${FALLBACK_LANG}`, requestConfig);
  return toList(fallback.data);
});

export const getProject = createAsyncThunk(
  "projects/getOne",
  async (slug, { rejectWithValue }) => {
    const fetchOne = (lang) =>
      axios.get(`${GET_PROJECTS}${encodeURIComponent(slug)}/?lang=${lang}`, requestConfig);
    const lang = currentLang();
    try {
      return (await fetchOne(lang)).data;
    } catch (error) {
      if (error.response?.status === 404 && lang !== FALLBACK_LANG) {
        try {
          return (await fetchOne(FALLBACK_LANG)).data;
        } catch (fallbackError) {
          return rejectWithValue({ status: fallbackError.response?.status ?? null });
        }
      }
      return rejectWithValue({ status: error.response?.status ?? null });
    }
  }
);
