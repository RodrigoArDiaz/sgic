import React, { useEffect, useState } from "react";
//MUI
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { routes } from "../../../routes";
import { peticionListarParametrosCursada } from "../../../api/alumnos/notasApi";
import NotasTipoExamen from "./NotasTipoExamen";
import SpinnerMoonLoaderMedium from "../../Spinners/SpinnerMoonLoaderMedium";
import { Box } from "@mui/material";
import MensajeFeedback from "../../MensajeFeedback";

/*** Componente NotasExamenesContenedor ***/
const NotasExamenesContenedor = () => {
  //Variable de estado que indica el estado de la peticion
  const [isLoading, setIsLoading] = useState(false);

  //Informacion de cursada
  const { cursada } = useSelector((state) => state.cursada);

  //Handle redireccion react router
  const navegar = useNavigate();

  //Parametros
  const [parametros, setParametros] = useState([]);

  const [sinResultados, setSinResultados] = useState("");

  const listarParametrosCursada = async () => {
    setIsLoading(true);
    //Realizo peticon
    try {
      const respuesta = await peticionListarParametrosCursada(
        cursada.IdCursada,
        null
      );

      let parametros = respuesta.data.res;
      console.log(parametros);
      setParametros(parametros);
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status == 460) {
        setSinResultados(error.response.data.Error);
      }

      if (error.response && error.response.status == 401) {
        //Sesion caducada (sin autorización)
        navegar(routes.iniciarSesion);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    listarParametrosCursada();
  }, []);

  return (
    <>
      {isLoading && <SpinnerMoonLoaderMedium />}

      {parametros.map((parametro) => {
        return (
          <CardMainPage visibleHeader={false} sx={{ marginTop: 2 }}>
            <NotasTipoExamen parametro={parametro} />{" "}
          </CardMainPage>
        );
      })}

      {!isLoading && sinResultados != "" && (
        <Box marginTop={2}>
          <MensajeFeedback>{sinResultados}</MensajeFeedback>
        </Box>
      )}
    </>
  );
};

export default NotasExamenesContenedor;
