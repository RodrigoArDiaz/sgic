export var status = "";

export var filas = [];
export var enunciados = "";
export var correcciones = "";
export var texto = "";
//export const [enunciados, setEnc] = React.useState('');
//export const [correcciones, setCor] = React.useState('');

export async function consultas(data, cadena) {
  const response = await fetch(cadena, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("tkn"),
    },
  });
  setStatus(response.status);
  return response.json();
}

export function setEnunciados(props) {
  enunciados = props;
}

export function setTxt(props) {
  texto = props;
}

export function setCorrecciones(props) {
  correcciones = props;
}

export function setStatus(props) {
  status = props;
}
