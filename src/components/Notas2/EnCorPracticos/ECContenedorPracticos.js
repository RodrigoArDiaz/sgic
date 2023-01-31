import React from "react";
import { Box, CardContent, Divider, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import ECPracticosLista from "./ECPracticosLista";
import { PracticoCorEnc } from "./PracticoCorEnc";
import BuscarAlumnos from "../BuscarAlumnos";
import BuscarGrupos from "../BuscarGrupos";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../../GestionCatedrasSuper/SnackMensajes";
import { useModal } from "../../../hooks/useModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import * as Responses from "../../Responses";
import { Zoom } from "@mui/material";
// import {DialogFullCustom} from "../"
import DialogFullCustom from "../../Material UI - Componentes Modificados/DialogFullCustom";
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import MensajeFeedback from "../../MensajeFeedback";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../../styles/EstilosSpinners";

export default function ECContenedorPracticos(props) {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const navegar = useNavigate();

  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = React.useState(10); //filas x pagina
  const [pagina, setPagina] = React.useState(1); //pagina actual
  const [paginacion, setPaginacion] = React.useState(); // cantidad de paginas a mostrar
  const [resultados, setResultado] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  //SnackBar

  const [mensaje, setMensaje] = React.useState();
  const [abrir, setAbrir] = React.useState(false);
  const [tipo, setTipo] = React.useState();

  const [enunciado, setEnc] = React.useState("");
  const [correccion, setCor] = React.useState("");

  function Refrescar() {
    setCargando("1");
    Responses.consultas(
      datosconsulta,
      "http://127.0.0.1:8000/api/buscarecpracticos"
    )
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }

  function BuscarAl(parametro) {
    parametro = { ...parametro, pidP: props.IdPractico };
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando("1");
    Responses.consultas(
      parametro,
      "http://127.0.0.1:8000/api/buscarecpracticos"
    )
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando("2");
          setPagina(1);
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }

  function CambioPagina(pag) {
    setPagina(1);
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando("1");
    Responses.consultas(
      datosconsulta,
      "http://127.0.0.1:8000/api/buscarecpracticos"
    )
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
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

    Responses.consultas(datos, "http://127.0.0.1:8000/api/buscarecpracticos")
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
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
      pidP: props.IdPractico,
      pidCu: props.cursada.IdCursada,
    };

    setPagina(1);
    setDC(data);

    Responses.consultas(data, "http://127.0.0.1:8000/api/buscarecpracticos")
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          console.log(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
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
          onClick={handleOpen}
          size="small"
          // variant="outlined"
          variant="contained"
          // color="secondary"
          color="primary"
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
                    <PracticoCorEnc CambioEnc={setEnc} CambioCor={setCor} />
                  </Grid>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  {props.cursada.TieneGrupos === "N" && (
                    <BuscarAlumnos
                      cursada={props.cursada}
                      actualizar={BuscarAl}
                      filasxpagina={filasxpagina}
                    />
                  )}

                  {props.cursada.TieneGrupos === "S" && (
                    <BuscarGrupos
                      cursada={props.cursada}
                      actualizar={BuscarAl}
                      filasxpagina={filasxpagina}
                    />
                  )}
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
                    <Grid container>
                      <ECPracticosLista
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
