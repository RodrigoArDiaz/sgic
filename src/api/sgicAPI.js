import axios from "axios";

//Endpoints
const rootUrl = "http://127.0.0.1:8000/api";
const loginAlumnoUrl = rootUrl + "/acceso/alumnos";
const loginDocenteUrl = rootUrl + "/acceso/docentes";
const loginSuperUrl = rootUrl + "/acceso/super";
const logoutUsuarioUrl = rootUrl + "/logout";
// const getDataUsuarioUrl = rootUrl + "/me2";
const getDataUsuarioUrl = rootUrl + "/mis_datos";
const registrarUsuarioUrl = rootUrl + "/registro";
const modificarContrasenaUrl = rootUrl + "/modificar_contrasena";

/****************************************************
 * Peticion para el logueo de usuario tipos alumnos
 * @param {*} frmData
 * @returns
 */
export const loginAlumno = (frmData) => {
  //Objeto con las claves que espera la API
  const credenciales = {
    Usuario: frmData.email,
    Contrasena: frmData.password,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginAlumnoUrl, credenciales, {
        headers: {
          Accept: "application/json",
        },
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

/****************************************************
 * Peticion para el logueo de usuario tipos docentes
 * @param {*} frmData
 * @returns
 */
export const loginDocente = (frmData) => {
  //Objeto con las claves que espera la API
  const credenciales = {
    Usuario: frmData.email,
    Contrasena: frmData.password,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginDocenteUrl, credenciales, {
        headers: {
          Accept: "application/json",
        },
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

/****************************************************
 * Peticion para el logueo de usuario tipos super
 * @param {*} frmData
 * @returns
 */
export const loginSuper = (frmData) => {
  //Objeto con las claves que espera la API
  const credenciales = {
    Usuario: frmData.email,
    Contrasena: frmData.password,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginSuperUrl, credenciales, {
        headers: {
          Accept: "application/json",
        },
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

/****************************************************
 * Peticion para deslogueo de usuarios
 * @returns
 */
export const logoutUsuario = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Realizo la peticion :
      //NOTA: cuando se realiza una peticion POST, el header debe
      //ir como tercer parametro, ya que el segundo parametro es para el
      //body.
      /**
       * Ej: axios.post(url,body,headers)
       */
      const res = await axios.post(
        getDataUsuarioUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

/****************************************************
 * Obtiene los datos del perfil del usuario
 * @param {*} token
 * @returns
 */
export const requestGetDataUsuario = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        getDataUsuarioUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

/****************************************************
 * Obtiene los datos del perfil del usuario
 * @param {*} token
 * @returns
 */
export const peticionRegistrarUsuario = (frmData) => {
  //Objeto con las claves que espera la API
  const credenciales = {
    Usuario: frmData.usuario,
    Contrasena: frmData.contrasenia,
    Email: frmData.email,
    Contrasena_confirmation: frmData.repetirContrasenia,
    Nombres: frmData.nombres,
    Apellidos: frmData.apellidos,
    Documento: frmData.dni,
  };

  console.log(credenciales);

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(registrarUsuarioUrl, credenciales, {
        headers: {
          Accept: "application/json",
        },
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

/****************************************************
 * Peticion para modificar contraseña del usuario
 * @param {*} frmData
 * @returns
 */
export const peticionModificarContrasena = (IdUsuario, formData, token) => {
  //Objeto con las claves que espera la API
  const credenciales = {
    IdUsuario: IdUsuario,
    ContrasenaActual: formData.contraseniaActual,
    ContrasenaNueva: formData.contraseniaNueva,
    ContrasenaConfirmacion: formData.repetirContrasenia,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(modificarContrasenaUrl, credenciales, {
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
