import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  error: "",
  token: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    loginPending: (state, action) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
      state.token = action.payload;
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload;
      state.token = "";
    },
    loginReset: (state, action) => {
      return initialState;
    },
  },
});

const { actions, reducer } = loginSlice;

export const { loginPending, loginSuccess, loginFail, loginReset } = actions;
export default loginSlice.reducer;
