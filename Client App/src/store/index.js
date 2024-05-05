import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import searchSlice from "./search";

// Tạo redux store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
