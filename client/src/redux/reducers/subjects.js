import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
  loader: true,
};

export const subjectsSlice = createSlice({
  initialState,
  name: "subjects",
  reducers: {
    subjectsExists: (state, action) => {
      state.subjects = action.payload;
      state.loader = false;
    },
    subjectsDoesNotExists: (state) => {
      state.subjects = [];
      state.loader = false;
    },
  },
});

export const { subjectsExists, subjectsDoesNotExists } = subjectsSlice.actions;
