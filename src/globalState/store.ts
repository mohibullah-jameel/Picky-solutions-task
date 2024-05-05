import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice/productSlice";
import filterReducer from "./filtersSlice/FilterSlice";
import cartReducer from "./cartSlice/CartSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
