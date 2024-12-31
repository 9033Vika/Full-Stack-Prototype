import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddFile: false,
  isAddImage: false,
  isShowImage: false,
  isDeleteFile: {
    status: false,
    fileId: null,
  },
};

export const miscSlice = createSlice({
  initialState,
  name: "misc",
  reducers: {
    setIsAddFile: (state, action) => {
      state.isAddFile = action.payload;
    },
    setIsAddImage: (state, action) => {
      state.isAddImage = action.payload;
    },
    setIsShowImage: (state, action) => {
      state.isShowImage = action.payload;
    },
    setIsDeleteFile: (state, action) => {
      state.isDeleteFile = action.payload;
    },
  },
});

export const { setIsAddFile, setIsAddImage, setIsShowImage, setIsDeleteFile } =
  miscSlice.actions;
