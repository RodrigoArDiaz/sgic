import React from "react";
//MUI
import { Grid } from "@mui/material";
//componentes personalizados
import TarjetaOrden from "./TarjetaOrden";
//
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//React router dom
import { useNavigate } from "react-router-dom";
//Peticiones
import * as Responses from "../../Responses";
//Redux
import { useSelector } from "react-redux";
import { routes } from "../../../routes";
import { endpoints } from "../../../api/endpoints";

/*** Componente OrdenarLista***/
export const OrdenarLista = (props) => {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

  const navegar = useNavigate();
  const [ordenes, SetO] = React.useState(props.filas.res);

  function Orden(dato1, dato2) {
    var data = {
      Fuente: dato1 + 1,
      Destino: dato2 + 1,
      pidP: props.IdParametro,
      pidCu: cursada.IdCursada,
      // pidCu: props.cursada.IdCursada,
    };
    Responses.consultas(data, endpoints.ordenarExamenes)
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
                      key={row.IdExamen.toString()}
                      draggableId={row.IdExamen.toString()}
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
