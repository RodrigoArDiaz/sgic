import * as React from "react";
import PaginaDocentesInicio from "./PaginaDocentesInicio";

/*** Componente PaginaDocentesNavegacion ***/
export default function PaginaDocentesNavegacion(props) {
  const [salto, setS] = React.useState("1");
  const [idcatedraprincipal, setCat] = React.useState();
  const [idmateriaprincipal, setMat] = React.useState();
  const [idcursadaprincipal, setCur] = React.useState();
  const [titulo, setT] = React.useState("Seleccione la cátedra");
  const [mat, setM] = React.useState();

  const [salto2, setSalto] = React.useState("1");

  function Modulo(props) {
    if (props.cambio === "1") {
      return (
        <PaginaDocentesInicio
          setT={setT}
          setCat={setCat}
          setMat={setMat}
          setCur={setCur}
          setM={setM}
          mat={mat}
          idmateriaprincipal={idmateriaprincipal}
          idcatedraprincipal={idcatedraprincipal}
          setS={setS}
          salto={salto}
        />
      );
    }
  }

  return <Modulo cambio={salto2} />;
}
