import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catedra: "",
  idCatedra: "",
};

export const userSlice = createSlice({
  name: "catedraActual",
  initialState,
  reducers: {
    actualizarCatedra: (state, action) => {
      state.catedra = action.payload;
    },
    actualizarIdCatedra: (state, action) => {
      state.idCatedra = action.payload;
    },
    catedraReset: (state, action) => {
      return initialState;
    },
  },
});

export const { actualizarCatedra, actualizarIdCatedra, catedraReset } =
  userSlice.actions;

export default userSlice.reducer;
