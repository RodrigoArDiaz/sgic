import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = "";
    },
    getUserFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    userReset: (state, action) => {
      return initialState;
    },
  },
});

export const { getUserPending, getUserSuccess, getUserFail, userReset } =
  userSlice.actions;

export default userSlice.reducer;
