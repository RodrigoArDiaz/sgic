import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

//Importacion de reducers
import loginReducer from "./slices/loginSlice";
import userReducer from "./slices/userSlice";
import menuReducer from "./slices/menuSlice";
import catedraReducer from "./slices/catedraSlice";
import materiaReducer from "./slices/materiaSlice";
import cursadaReducer from "./slices/cursadaSlice";

//Importacion para redux-persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

//Tipo de storage en donde se desea guardar
import storage from "redux-persist/lib/storage"; //LocalStorage
import sessionStorage from "redux-persist/es/storage/session"; //SessionStorage

const reducers = combineReducers({
  login: loginReducer,
  user: userReducer,
  menu: menuReducer,
  catedra: catedraReducer,
  materia: materiaReducer,
  cursada: cursadaReducer,
});

//En blacklist van los estados que no quiero que persistan
//En whitekist van los estados que  quiero que persistan
//Si no se declara ninguna, todos los estados persisten.
//NO USAR AMBAS AL MISMOS TIEMPO, SOLO UTILIZAR UNA
const persistConfig = {
  key: "root",
  version: 1,
  storage: sessionStorage,
  // storage,
  // blacklist: ['user','login'],
  // whitelist: ['login'],
};
// const persistedUserReducer = persistReducer(persistConfig, userReducer);
// const persistedLoginReducer = persistReducer(persistConfig, loginReducer);

const persistedReducers = persistReducer(persistConfig, reducers);

// export default configureStore({
//     reducer: {
//        login: persistedLoginReducer,
//        user: persistedUserReducer,
//     }
// })

export default configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
