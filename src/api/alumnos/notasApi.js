import axios from "axios";
import { rootUrl } from "../rootUrl";

const buscarMisNotasPracticos = rootUrl + "/buscarmisnotaspracticos";
const buscarMisNotasExamenes = rootUrl + "/buscarmisnotasexamenes";
const listarParametrosCursada = rootUrl + "/alumnoslistarparametros";
const buscarMiSituacionFinal = rootUrl + "/buscarmisituacionfinal";
const buscarEnunciadoCorreccionesPracticoUrl =
  rootUrl + "/buscarmisecpracticos";
const buscarEnunciadoCorreccionesExamenUrl = rootUrl + "/buscarmisecexamenes";
const infoCursadaUrl = rootUrl + "/alumnosinfocursada";
const listarIntegrantesGrupoUrl = rootUrl + "/alumnoslistarintegrantes";

/****************************************************
 * Peticion para buscar las notas de los practicos del alumno
 * @param {*} frmData
 * @returns
 */
export const peticionBuscarMisNotasPracticos = (pidCu, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    pidCu: pidCu,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(buscarMisNotasPracticos, credenciales, {
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
 * Peticion para buscar las notas de los practicos del alumno
 * @param {*} frmData
 * @returns
 */
export const peticionBuscarMisNotasExamenes = (pidCu, pidPar, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    pidCu: pidCu,
    pidPar: pidPar,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(buscarMisNotasExamenes, credenciales, {
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
 * Peticion para buscar las notas de los practicos del alumno
 * @param {*} frmData
 * @returns
 */
export const peticionListarParametrosCursada = (IdCursada, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    IdCursada: IdCursada,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(listarParametrosCursada, credenciales, {
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
 * Peticion para buscar las notas de los practicos del alumno
 * @param {*} frmData
 * @returns
 */
export const peticionBuscarMiSituacionFinal = (IdCursada, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    pidCu: IdCursada,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(buscarMiSituacionFinal, credenciales, {
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
 * Peticion para buscar las notas de los practicos del alumno
 * @param {*} frmData
 * @returns
 */
export const peticionBuscarEnunciadoCorreccionesPractico = (
  pidCu,
  pidP,
  token
) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    pidCu: pidCu,
    pidP: pidP,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        buscarEnunciadoCorreccionesPracticoUrl,
        credenciales,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

/****************************************************
 * Peticion para buscar las notas de los practicos del alumno
 * @param {*} frmData
 * @returns
 */
export const peticionBuscarEnunciadoCorreccionesExamen = (
  pidCu,
  pidE,
  token
) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    pidCu: pidCu,
    pidE: pidE,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        buscarEnunciadoCorreccionesExamenUrl,
        credenciales,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

/****************************************************
 * Peticion para buscar las notas de los practicos del alumno
 * @param {*} frmData
 * @returns
 */
export const peticionInfoCursada = (pidCu, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    pidCu: pidCu,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(infoCursadaUrl, credenciales, {
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
 * Peticion para buscar las notas de los practicos del alumno
 * @param {*} frmData
 * @returns
 */
export const peticionListarIntegrantesGrupo = (pidCu, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    pidCu: pidCu,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(listarIntegrantesGrupoUrl, credenciales, {
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
