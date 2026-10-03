import { createSlice } from "@reduxjs/toolkit";
import { getProject, getProjects } from "./index";

const initialState = {
  list: [],
  listLoading: true,
  listError: null,

  current: null,
  currentLoading: true,
  currentNotFound: false,
  currentError: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.error.message;
      })

      .addCase(getProject.pending, (state) => {
        // Drop the previous project so its content never flashes under a new URL.
        state.current = null;
        state.currentLoading = true;
        state.currentNotFound = false;
        state.currentError = null;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.currentLoading = false;
        state.current = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.currentLoading = false;
        state.currentNotFound = action.payload?.status === 404;
        state.currentError = action.payload?.status === 404 ? null : "error";
      });
  },
});

export default projectsSlice.reducer;
