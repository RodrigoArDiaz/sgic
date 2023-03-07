import axios from "axios";
import { rootUrl } from "../rootUrl";

const modificarAlumnoURL = rootUrl + "/modificar_perfil";
const dameLibretaUrl = rootUrl + "/dame_libreta";
//Endpoints

/****************************************************
 * Peticion para modificar un docente
 * @param {*} frmData
 * @returns
 */
export const peticionModificarAlumno = (formData, token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  const credenciales = {
    pUs: formData.Usuario,
    pMail: formData.Email,
    pDoc: formData.Documento,
    pNom: formData.Nombres,
    pAp: formData.Apellidos,
    pLib: formData.Libreta,
    token: token,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(modificarAlumnoURL, credenciales, {
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
export const peticionDameLibreta = (token) => {
  //Si token (de redux) esta vacion, lo busca en localStorage
  if (!token) {
    token = localStorage.getItem("tkn");
  }

  const credenciales = { token: token };

  console.log(credenciales);

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(dameLibretaUrl, credenciales, {
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
