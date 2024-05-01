import axios from "axios";
import { BASE_URL } from "@env";

export const baseURL = BASE_URL;

export default axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
