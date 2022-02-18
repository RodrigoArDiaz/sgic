import axios from "axios";
import { useDispatch } from "react-redux";

//Endpoints
const rootUrl = "http://127.0.0.1:8000/api";
const crearDocenteUrl = rootUrl + "/crear_docente";

/****************************************************
 * Peticion para la creacion de docentes
 * @param {*} frmData
 * @returns
 */
export const peticionCrearDocente = (frmData, token) => {
  //Objeto con las claves que espera la API
  const credenciales = {
    Usuario: frmData.Usuario,
    Contrasena: frmData.Contrasenia,
    Contrasena_confirmation: frmData.Contrasenia,
    Documento: frmData.Documento,
    Apellidos: frmData.Apellidos,
    Nombres: frmData.Nombres,
    Email: frmData.Email,
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
