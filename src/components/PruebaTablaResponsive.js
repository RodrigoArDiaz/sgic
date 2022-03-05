import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Grid } from "@mui/material";
import { Box } from "@mui/system";
// import { ModificarDocente } from "./ModificarDocente";
// import { AltaDocente } from "./AltaDocente";
// import { BajaDocente } from "./BajaDocente";
// import { BorrarDocente } from "./BorrarDocente";

const docentes = [
  {
    Apellidos: "Diaz",
    Nombres: "Rodrigo",
    Documento: "39359920",
    Email: "diazrodrigoar@gmail.com",
    Estado: "A",
    Usuario: "diazrod",
  },
  {
    Apellidos: "Luchesse",
    Nombres: "Augusto Gustavo",
    Documento: "20300100",
    Email: "gustavo@gmail.com",
    Estado: "B",
    Usuario: "lucheseaug",
  },
];

export default function PruebaTablaResponsive() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Grid sx={{ overflowX: "auto" }}>
              <Box padding={4}>
                <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="Lista de Catedras">
                    <TableHead>
                      <TableRow>
                        <TableCell>Apellidos</TableCell>
                        <TableCell>Nombres</TableCell>
                        <TableCell>Documento</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {docentes.map((docente) => (
                        <TableRow
                          key={docente.Documento}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {docente.Apellidos}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            {docente.Nombres}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            {docente.Documento}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            {docente.Email}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            {docente.Estado}
                          </TableCell>

                          <TableCell align="center">
                            <Grid container justifyContent="space-between">
                              <Grid item item xs={12} sm="auto">
                                {/* <ModificarDocente docente={docente} /> */}
                              </Grid>

                              <Grid item item xs={12} sm="auto">
                                {/* <AltaDocente estado={docente.Estado} /> */}
                              </Grid>

                              <Grid item item xs={12} sm="auto">
                                {/* <BajaDocente estado={docente.Estado} /> */}
                              </Grid>

                              <Grid item item xs={12} sm="auto">
                                {/* <BorrarDocente /> */}
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} bgcolor="primary">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora, enim!
        Quaerat illum expedita, optio, doloremque non iusto culpa nisi id,
        voluptatibus ad quidem enim excepturi inventore perferendis praesentium!
        Vitae, maxime!
      </Grid>
    </Grid>
  );
}
