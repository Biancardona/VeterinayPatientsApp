import axios from "axios";

//Create una base URL
//Define a function with .create method that going to create a URL base

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});
export default axiosClient;
