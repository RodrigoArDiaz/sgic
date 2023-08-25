import axios from "axios";
import { rootUrl } from "../rootUrl";

//Endpoints
// const rootUrl = "http://127.0.0.1:8000/api";
const crearDocenteUrl = rootUrl + "/crear_docente";
const buscarDocenteUrl = rootUrl + "/buscar_docente";
const altaDocenteUrl = rootUrl + "/alta_docente";
const bajaDocenteUrl = rootUrl + "/baja_docente";
const borrarDocenteUrl = rootUrl + "/borrar_docente";
const modificarDocenteUrl = rootUrl + "/modificar_docente";
// const modificarDocenteUrl = rootUrl + "/modus";

/****************************************************
 * Peticion para la creacion de docentes
 * @param {*} frmData
 * @returns
 */
export const peticionCrearDocente = (frmData, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    Usuario: frmData.Usuario,
    // Contrasena: frmData.Contrasenia,
    // Contrasena_confirmation: frmData.Contrasenia,
    Documento: frmData.Documento,
    Apellidos: frmData.Apellidos,
    Nombres: frmData.Nombres,
    Email: frmData.Email,
    token: token,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(crearDocenteUrl, credenciales, {
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
 * Peticion para la busqueda de docentes
 * @param {*} frmData
 * @returns
 */
export const peticionBuscarDocente = (frmData, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    // Usuario: frmData.Usuario,
    Email: frmData.Email,
    Nombres: frmData.Nombres,
    Apellidos: frmData.Apellidos,
    Documento: frmData.Documento,
    Bajas: frmData.Bajas ? "B" : "",
    Offset: frmData.Offset,
    Limite: frmData.Limite,
    token: token,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(buscarDocenteUrl, credenciales, {
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
 * Peticion para la baja de un docente
 * @param {*} frmData
 * @returns
 */
export const peticionAltaDocente = (IdUsuario, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    IdUsuario: IdUsuario,
    token: token,
  };

  // console.log(credenciales);

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(altaDocenteUrl, credenciales, {
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
 * Peticion para el alta de un docente
 * @param {*} frmData
 * @returns
 */
export const peticionBajaDocente = (IdUsuario, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    IdUsuario: IdUsuario,
    token: token,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(bajaDocenteUrl, credenciales, {
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
 * Peticion para borrar un docente
 * @param {*} frmData
 * @returns
 */
export const peticionBorrarDocente = (IdUsuario, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    IdUsuario: IdUsuario,
    token: token,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(borrarDocenteUrl, credenciales, {
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
 * Peticion para modificar un docente
 * @param {*} frmData
 * @returns
 */
export const peticionModificarDocente = (formData, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  // const credenciales = {
  //   pUs: formData.Usuario,
  //   pMail: formData.Email,
  //   pDoc: formData.Documento,
  //   pNom: formData.Nombres,
  //   pAp: formData.Apellidos,
  //   token: token,
  // };

  const credenciales = {
    Usuario: formData.Usuario,
    Email: formData.Email,
    Documento: formData.Documento,
    Nombres: formData.Nombres,
    Apellidos: formData.Apellidos,
    IdUsuario: formData.IdUsuario,
    token: token,
  };

  console.log(credenciales);

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(modificarDocenteUrl, credenciales, {
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
