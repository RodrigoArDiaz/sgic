import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  materia: "",
  idMateria: "",
  jsonMateria: [],
};

export const userSlice = createSlice({
  name: "materiaActual",
  initialState,
  reducers: {
    actualizarMateria: (state, action) => {
      state.materia = action.payload;
    },
    actualizarIdMateria: (state, action) => {
      state.idMateria = action.payload;
    },
    actualizarJsonMateria: (state, action) => {
      state.jsonMateria = action.payload;
    },
    materiaReset: (state, action) => {
      return initialState;
    },
  },
});

export const {
  actualizarMateria,
  actualizarIdMateria,
  actualizarJsonMateria,
  materiaReset,
} = userSlice.actions;

export default userSlice.reducer;
