import axios from "axios";

export const baseURL = "http://13.232.201.89:8001";

export default axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
