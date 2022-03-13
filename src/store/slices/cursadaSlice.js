import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idCursada: "",
  anio: "",
};

export const userSlice = createSlice({
  name: "catedraActual",
  initialState,
  reducers: {
    actualizarCursada: (state, action) => {
      state.idCursada = action.payload;
    },
    actualizarAnio: (state, action) => {
      state.anio = action.payload;
    },
    cursadaReset: (state, action) => {
      return initialState;
    },
  },
});

export const { actualizarCatedra, actualizarIdCatedra, catedraReset } =
  userSlice.actions;

export default userSlice.reducer;
