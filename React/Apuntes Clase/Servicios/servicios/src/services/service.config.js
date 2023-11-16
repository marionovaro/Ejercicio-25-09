import axios from "axios"
import { updateToken } from "../utils";

const APIHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${updateToken()}`,
  };

  export const APIUser = axios.create({
    baseURL: `https://nodeuser-production-0fd1.up.railway.app/api/v1`, //? el url de la API en railway
    headers: APIHeaders, //? los headers creados arriba
    timeout: 600000, //? tiempo máximo para esperar en una request
  })