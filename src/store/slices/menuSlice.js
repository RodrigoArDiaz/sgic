import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listaItems: [], //Arrays de json con la informacion de los items del menu
  titulo: "", //Titulo del header del navbar
};

export const userSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    actualizarMenu: (state, action) => {
      state.listaItems = action.payload;
    },
    actualizarTitulo: (state, action) => {
      state.titulo = action.payload;
    },
    menuReset: (state, action) => {
      return initialState;
    },
  },
});

export const { actualizarMenu, actualizarTitulo, menuReset } =
  userSlice.actions;

export default userSlice.reducer;
