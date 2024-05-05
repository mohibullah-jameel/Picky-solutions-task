import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductState {
  isLoading: boolean;
  products: Product[];
  error: string | undefined;
  categories: string[];
}

const initialState: ProductState = {
  isLoading: false,
  products: [],
  error: "",
  categories: [],
};

export const fetchProductsAsync = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    // const response = await fetchProducts();
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/products`
    );
    const data = await response.json();
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = "";
      state.categories = Array.from(
        new Set(action.payload?.map((product: any) => product?.category))
      );
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

// export const { fetchProductsAsync } = productSlice.actions;

export default productSlice.reducer;
