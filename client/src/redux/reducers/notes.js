import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  loader: true,
};

export const notesSlice = createSlice({
  initialState,
  name: "notes",
  reducers: {
    notesExists: (state, action) => {
      state.notes = action.payload;
      state.loader = false;
    },
    notesDoesNotExist: (state) => {
      state.notes = [];
      state.loader = false;
    },
  },
});

export const { notesExists, notesDoesNotExist } = notesSlice.actions;
