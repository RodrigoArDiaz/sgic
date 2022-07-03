import React from "react";
import { Paper, Typography } from "@mui/material";
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

export default function ECContenedorPracticos(props) {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const navegar = useNavigate();

  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = React.useState(1); //filas x pagina
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
      <Tooltip title="Enunciados y correcciones" fullWidth>
        <Button onClick={handleOpen} size="small">
          {props.nombre}
        </Button>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} fullScreen>
        <DialogTitle>Enunciados y Correcciones - {props.Nombre}</DialogTitle>
        <DialogContent>
          <Paper
            component="div"
            sx={{
              p: "4px 4px",
              // display: 'flex',
              alignItems: "center",
              width: "95%",
              mt: "10px",
              px: 2,
              pb: 3,
              // minHeight: "75vh",
            }}
            elevation={3}
          >
            <Grid container pt={1} justifyContent="flex-end" spacing={2}>
              <Grid item xs={12}>
                <PracticoCorEnc CambioEnc={setEnc} CambioCor={setCor} />
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
            </Grid>

            {cargando === "3" && <h4>No se encontraron resultados</h4>}
            {cargando === "1" && (
              <Grid container pt={2}>
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  <LinearProgress color="inherit" />
                  <LinearProgress color="inherit" />
                  <LinearProgress color="inherit" />
                </Stack>
              </Grid>
            )}
            {cargando === "2" && (
              <>
                <Grid container pt={2}>
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

            <div>
              <SnackMensajes
                abrir={abrir}
                mensaje={mensaje}
                tipo={tipo}
                cerrar={setAbrir}
              />{" "}
            </div>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Volver</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
