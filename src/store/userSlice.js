import { createSlice } from "@reduxjs/toolkit";

export const USER_STORAGE_KEY = "afterglow.user";

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) ?? null;
  } catch {
    return null;
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: { current: loadUser() },
  reducers: {
    setUser(state, { payload }) {
      state.current = payload;
    },
    logout(state) {
      state.current = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
