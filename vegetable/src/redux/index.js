import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSliceRducer from "./productSlice";

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        product: productSliceRducer,
    },
});