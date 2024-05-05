import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Product } from "../../types/types";

export interface cartState {
  cartItems: Product[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState: cartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        if (state.cartItems[existingIndex]) {
          state.cartItems[existingIndex] = {
            ...state.cartItems[existingIndex],
            cartQuantity:
              (state.cartItems[existingIndex].cartQuantity || 0) + 1,
          };
          toast.info("Increased product quantity", { position: "top-center" });
        }
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", { position: "top-center" });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * (cartQuantity ?? 0);

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity ?? 0;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "top-center" });
    },
  },
});

export const { addToCart, getTotals, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
