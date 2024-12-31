import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: [],
  loader: true,
};

export const classesSlice = createSlice({
  initialState,
  name: "classes",
  reducers: {
    classesExists: (state, action) => {
      state.classes = action.payload;
      state.loader = false;
    },
    classesDoesNotExist: (state) => {
      state.classes = [];
      state.loader = false;
    },
  },
});

export const { classesExists, classesDoesNotExist } = classesSlice.actions;
