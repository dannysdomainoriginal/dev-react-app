import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1960",
});

export const errHandler = (err) => {
  err.response?.data
    ? console.error(err.response?.data)
    : err.request
    ? console.error(err.request)
    : console.error(err.message);
};

export default api;
