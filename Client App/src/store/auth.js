import { createSlice, configureStore } from "@reduxjs/toolkit";

const initState = {
  user: {},
  isLogin: false,
};

// Khởi tạo Redux state slice
const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    ON_LOGIN(state) {
      state.isLogin = true;
    },
    ON_LOGOUT(state) {
      state.isLogin = false;
      state.user = {};
    },
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export default store;
