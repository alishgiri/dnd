import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.dnd5eapi.co/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
