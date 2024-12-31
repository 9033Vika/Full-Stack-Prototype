import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { coursesSlice } from "./reducers/courses";
import { classesSlice } from "./reducers/classes";
import { subjectsSlice } from "./reducers/subjects";
import { notesSlice } from "./reducers/notes";
import { miscSlice } from "./reducers/misc";
import { cartSlice } from "./reducers/cart";
import { paymentSlice } from "./reducers/payment";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [coursesSlice.name]: coursesSlice.reducer,
    [classesSlice.name]: classesSlice.reducer,
    [subjectsSlice.name]: subjectsSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [paymentSlice.name]: paymentSlice.reducer,
    [notesSlice.name]: notesSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
  },
});
