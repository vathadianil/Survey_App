import axios from "axios";
const baseAuthURL = "https://identitytoolkit.googleapis.com/v1/accounts:";

export const authAxios = axios.create({
  baseURL: baseAuthURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
