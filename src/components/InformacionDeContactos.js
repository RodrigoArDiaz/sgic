import React from "react";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Edit, Lock } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

import { useSelector } from "react-redux";

const contactos = [
  {
    tipo: "facebook",
    link: "https://www.facebook.com/...",
  },
  {
    tipo: "github",
    link: "https://github.com/...",
  },
  {
    tipo: "whatsapp",
    link: "+549381510010",
  },
];

export default function InformacionDeContactos() {
  const { user } = useSelector((state) => state.user);
  const { Usuario, Email, Documento, Nombres, Apellidos } = user;

  return (
    <>
      <TableContainer component={Grid} spacing={4}>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Información de contactos" />
          </Divider>
        </Grid>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactos.map((contacto) => (
              <TableRow
                key={contacto.tipo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{contacto.link}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
