import React from "react";
//MUI
import { Box, CardContent, Divider, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
//
import ECExamenesLista from "./ECExamenesLista";
import { ExamenCorEnc } from "./ExamenCorEnc";
import BuscarAlumnos from "../BuscarAlumnos";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../../GestionCatedrasSuper/SnackMensajes";
import { useModal } from "../../../hooks/useModal";
import * as Responses from "../../Responses";
import DialogFullCustom from "../../Material UI - Componentes Modificados/DialogFullCustom";
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import MensajeFeedback from "../../MensajeFeedback";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../../styles/EstilosSpinners";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente ECContenedorExamenes ***/
export default function ECContenedorExamenes(props) {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const navegar = useNavigate();

  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = React.useState(10); //filas x pagina
  const [pagina, setPagina] = React.useState(1); //pagina actual
  const [paginacion, setPaginacion] = React.useState(); // cantidad de paginas a mostrar
  const [resultados, setResultado] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  const [mensaje, setMensaje] = React.useState();
  const [abrir, setAbrir] = React.useState(false);
  const [tipo, setTipo] = React.useState();

  const [enunciado, setEnc] = React.useState("");
  const [correccion, setCor] = React.useState("");

  function Refrescar() {
    setCargando("1");
    Responses.consultas(datosconsulta, endpoints.buscarECExamenes)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  function BuscarAl(parametro) {
    parametro = { ...parametro, pidE: props.IdExamen };
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando("1");
    Responses.consultas(parametro, endpoints.buscarECExamenes)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando("2");
          setPagina(1);
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  function CambioPagina(pag) {
    setPagina(1);
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando("1");
    Responses.consultas(datos, endpoints.buscarECExamenes)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  function CambioFPP(pag) {
    setPagina(1);
    setFXP(pag);
    var datos = datosconsulta;
    datos.Offset = 0;
    datos.Limite = pag;

    setDC(datos);

    setCargando("1");

    Responses.consultas(datos, endpoints.buscarECExamenes)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  React.useEffect(() => {
    var data = {
      pNom: "",
      pAp: "",
      pLib: "",
      pGru: "",

      Offset: 0,
      Limite: filasxpagina,
      pidE: props.IdExamen,
      pidCu: props.cursada.IdCursada,
    };
    setPagina(1);
    setDC(data);

    Responses.consultas(data, endpoints.buscarECExamenes)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }, []);

  return (
    <>
      <Tooltip
        title="Enunciados y correcciones"
        fullWidth
        TransitionComponent={Zoom}
        arrow
        placement="top"
      >
        <Button
          onClick={() => {
            Refrescar();
            handleOpen();
          }}
          size="small"
          variant="contained"
        >
          {props.nombre}
        </Button>
      </Tooltip>

      {/* Ventana modal */}
      <DialogFullCustom
        open={isOpen}
        onClose={handleClose}
        title="Enunciados y Correcciones"
        subtitle={props.Nombre}
        icon="add"
      >
        <DialogContent sx={{ padding: 0 }}>
          <CardMainPage visibleHeader={false}>
            <CardContent
              sx={{
                paddingRight: 0,
                paddingLeft: 0,
                "& .MuiCardContent-root:last-child": { paddingBottom: 0 },
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Grid container paddingX={2}>
                    <ExamenCorEnc CambioEnc={setEnc} CambioCor={setCor} />
                  </Grid>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <BuscarAlumnos
                    cursada={props.cursada}
                    actualizar={BuscarAl}
                    filasxpagina={filasxpagina}
                  />
                </Grid>

                {cargando === "1" && (
                  <Grid container paddingTop={2}>
                    <Grid item xs={12}>
                      <Box
                        component="div"
                        display="flex"
                        justifyContent="center"
                      >
                        <MoonLoader
                          color={colorMainSpinner}
                          size={sizeMainSpinner}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                )}

                {cargando === "2" && (
                  <>
                    <Grid container pt={0}>
                      <ECExamenesLista
                        filas={filas}
                        filasxpagina={filasxpagina}
                        pagina={pagina}
                        paginacion={paginacion}
                        resultados={resultados}
                        actualizarpagina={CambioPagina}
                        actualizarfilas={CambioFPP}
                        refrescar={Refrescar}
                        cursada={props.cursada}
                        abrir={setAbrir}
                        mensaje={setMensaje}
                        tipo={setTipo}
                        enc={enunciado}
                        cor={correccion}
                      />
                    </Grid>
                  </>
                )}

                {cargando === "3" && (
                  <Grid container paddingTop={2}>
                    <Grid item xs={12}>
                      <Box
                        component="div"
                        display="flex"
                        justifyContent="center"
                        paddingX={2}
                      >
                        <MensajeFeedback>
                          No se encontraron resultados
                        </MensajeFeedback>
                      </Box>
                    </Grid>
                  </Grid>
                )}

                <div>
                  <SnackMensajes
                    abrir={abrir}
                    mensaje={mensaje}
                    tipo={tipo}
                    cerrar={setAbrir}
                  />{" "}
                </div>
              </Grid>
            </CardContent>
          </CardMainPage>
        </DialogContent>
      </DialogFullCustom>
    </>
  );
}
