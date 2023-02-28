import axios from "axios";
import { rootUrl } from "../rootUrl";

//Endpoints
const listarContactosAlumnoUrl = rootUrl + "/listar_contactos";
const agregarContactoAlumnoUrl = rootUrl + "/agregar_contacto";
const borrarContactoAlumnoUrl = rootUrl + "/borrar_contacto";
const modificarContactoAlumnoUrl = rootUrl + "/modificar_contacto";

/****************************************************
 * Peticion para el listado de contactos de un usuario
 * @param {*} frmData
 * @returns
 */
export const peticionListarContactos = (IdUsuario, token) => {
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    IdUsuario: IdUsuario,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(listarContactosAlumnoUrl, credenciales, {
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
 * Peticion para crear contacto
 * @param {*} frmData
 * @returns
 */
export const peticionAgregarContacto = (IdUsuario, formData, token) => {
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    IdUsuario: IdUsuario,
    Nombre: formData.redSocial,
    Perfil: formData.perfil,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(agregarContactoAlumnoUrl, credenciales, {
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
 * Peticion para borrar contacto
 * @param {*} frmData
 * @returns
 */
export const peticionBorrarContacto = (IdUsuario, IdContacto, token) => {
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    IdUsuario: IdUsuario,
    IdContacto: IdContacto,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(borrarContactoAlumnoUrl, credenciales, {
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
 * Peticion para modificar contacto
 * @param {*} frmData
 * @returns
 */
export const peticionModificarContacto = (
  IdContacto,
  IdUsuario,
  formData,
  token
) => {
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  //Objeto con las claves que espera la API
  const credenciales = {
    IdUsuario: IdUsuario,
    IdContacto: IdContacto,
    Perfil: formData.perfil,
    Nombre: formData.redSocial,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(modificarContactoAlumnoUrl, credenciales, {
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
