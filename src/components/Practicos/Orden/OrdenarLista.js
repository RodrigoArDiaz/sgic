import React from "react";
//Material UI
import { Grid } from "@mui/material";
//Componentes personalizados
import TarjetaOrden from "./TarjetaOrden";
//
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//
import * as Responses from "../../Responses";
//
import { useNavigate } from "react-router-dom";
//Endpoints
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente OrdenarLista ***/
export const OrdenarLista = (props) => {
  const navegar = useNavigate();
  const [ordenes, SetO] = React.useState(props.filas.res);

  function Orden(dato1, dato2) {
    var data = {
      Fuente: dato1 + 1,
      Destino: dato2 + 1,
      pidCu: props.cursada.IdCursada,
    };
    Responses.consultas(data, endpoints.ordenarPracticos)
      .then((response) => {
        if (Responses.status === 200) {
          props.CerrarBack();
          props.refrescar();
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(ordenes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    SetO(items);

    props.AbrirBack();
    Orden(result.source.index, result.destination.index);
  }

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <Grid container>
      <Grid item xs={12}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="practicos">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {ordenes.map((row, index) => {
                  return (
                    <Draggable
                      key={row.IdPractico.toString()}
                      draggableId={row.IdPractico.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Grid item xs={12} sx={{ mt: 1 }}>
                            <TarjetaOrden fila={row} />
                          </Grid>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Grid>
  );
};
