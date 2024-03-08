import axios from "axios";

const baseURL = "http://132.232.201.89:8001";

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
