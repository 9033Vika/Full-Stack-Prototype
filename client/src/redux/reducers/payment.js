import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: [],
  loader: true,
};

export const paymentSlice = createSlice({
  initialState,
  name: "payment",
  reducers: {
    paymentExists: (state, action) => {
      state.payment = action.payload;
      state.loader = false;
    },
    paymentDoesNotExist: (state) => {
      state.payment = [];
      state.loader = false;
    },
  },
});

export const { paymentExists, paymentDoesNotExist } = paymentSlice.actions;
