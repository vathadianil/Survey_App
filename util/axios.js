import axios from "axios";

const baseURL = "http://13.201.5.209:8001";

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
