import axios from "axios";
import { rootUrl } from "../rootUrl";

const buscarMisCursadasUrl = rootUrl + "/buscarmiscursadas";
const buscarCursadasInscripcionUrl = rootUrl + "/buscarcursadaseninscripcion";
const inscribirmeEnCursadaUrl = rootUrl + "/inscribirme";

/****************************************************
 * Peticion para buscar las cursadas del alumno
 * @param {*} frmData
 * @returns
 */
export const peticionBuscarMisCursadas = (Offset, Limite, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    pSem: null,
    pAn: null,
    pidMat: 1,
    Offset: Offset,
    Limite: Limite,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(buscarMisCursadasUrl, credenciales, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

/****************************************************
 * Peticion para buscar las cursadas en inscripcion
 * @param {*} frmData
 * @returns
 */
export const peticionListarCursadasInscripciones = (pMateria, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = { Materia: pMateria };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(buscarCursadasInscripcionUrl, credenciales, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

/****************************************************
 * Peticion para buscar las cursadas en inscripcion
 * @param {*} frmData
 * @returns
 */
export const peticionInscribirseEnCursada = (IdCursada, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = { pidCu: IdCursada };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(inscribirmeEnCursadaUrl, credenciales, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
