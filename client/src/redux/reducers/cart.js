import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loader: true,
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    cartExists: (state, action) => {
      state.cart = action.payload;
      state.loader = false;
    },
    cartDoesNotExist: (state) => {
      state.cart = [];
      state.loader = false;
    },
  },
});

export const { cartExists, cartDoesNotExist } = cartSlice.actions;
