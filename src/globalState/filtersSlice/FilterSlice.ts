import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface filterState {
  searchText: string;
  category: string;
}

const initialState: filterState = {
  searchText: "",
  category: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (
      state,
      action: PayloadAction<{ type: string; payload: string }>
    ) => {
      const { type, payload } = action.payload;
      if (type === "textInput") {
        state.searchText = payload;
      } else if (type === "category") {
        state.category = payload;
      }
    },

    clearFilter: (state, action: PayloadAction<{ type: string }>) => {
      const { type } = action.payload;
      if (type === "textInput") {
        state.searchText = "";
      } else if (type === "category") {
        state.category = "";
      }
    },
  },
});

export const { updateFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
