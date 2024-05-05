import { createSlice } from "@reduxjs/toolkit";

const initState = {
  searchParams: {},
};

// Khởi tạo Redux state slice
const searchSlice = createSlice({
  name: "search",
  initialState: initState,
  reducers: {
    setSearchParams(state, action) {
      state.searchParams = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
