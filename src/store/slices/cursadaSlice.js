import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idCursada: "",
  anio: "",
  semestre: "",
};

export const userSlice = createSlice({
  name: "catedraActual",
  initialState,
  reducers: {
    actualizarIdCursada: (state, action) => {
      state.idCursada = action.payload;
    },
    actualizarAnio: (state, action) => {
      state.anio = action.payload;
    },
    actualizarSemestre: (state, action) => {
      state.semestre = action.payload;
    },
    cursadaReset: (state, action) => {
      return initialState;
    },
  },
});

export const {
  actualizarIdCursada,
  actualizarAnio,
  cursadaReset,
  actualizarSemestre,
} = userSlice.actions;

export default userSlice.reducer;
