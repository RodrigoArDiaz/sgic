import React from "react";

export var filas = [];
export var enunciados = "";
export var correcciones = "";
export var texto = "";
export var res = "";

export function setRes(props) {
  res = props;
}
export function setEnunciados(props) {
  enunciados = props;
}

export function setTxt(props) {
  texto = props;
}

export function setFs(props) {
  filas = props;
}

export function setCorrecciones(props) {
  correcciones = props;
}
