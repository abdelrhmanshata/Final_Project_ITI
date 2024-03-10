import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL
  baseURL: "http://127.0.0.1:9000/",
});
