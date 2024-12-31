import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  loader: true,
};

export const coursesSlice = createSlice({
  initialState,
  name: "courses",
  reducers: {
    coursesExists: (state, action) => {
      state.courses = action.payload;
      state.loader = false;
    },
    coursesDoesNotExist: (state) => {
      state.courses = [];
      state.loader = false;
    },
  },
});

export const { coursesExists, coursesDoesNotExist } = coursesSlice.actions;
