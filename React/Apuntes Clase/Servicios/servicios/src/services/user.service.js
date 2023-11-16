import { updateToken } from "../utils";
import { APIUser } from "./service.config";


export const registerUser = async (formData) => {
    return APIUser.post("/users/register", formData, { //? posteamos a la ruta que ponemos, el formData que metemos en params
      headers: { "Content-Type": "multipart/form-data" }, //? le indicamos las modificaciones de los headers, que si hay imagen el contentType es multipart para meter la img
    })
      .then((res) => res) //? gestionamos con promesas y devolvemos siempre la respuesta COMPLETA
      .catch((error) => error); //? en caso de que haya algún error lo catcheamos para gestionarlos
  };

  //? 