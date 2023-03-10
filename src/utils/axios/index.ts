import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { fetchFromStorage } from "../storage";
import { identifiers } from "../constants/identifiers";
import { logoutUser } from "../validators/HelperFunctions";
const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: { "Content-Type": "application/json" },
  params: { lang: "en_IN" },
});
axiosInstance.defaults.timeout = 300000;

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = fetchFromStorage(identifiers.access_token);
  const clonedConfig: any = config;

  if (token) {
    clonedConfig.headers.common = {
      Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    };
  }

  return clonedConfig;
});

axiosInstance.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  (error: AxiosError) => {
    if(error.response&& error.response.status===401 && window.location.pathname!=='/login'){
      console.log(error.response);
      logoutUser();
    }
    console.log("error");
    return Promise.reject(error);
  }
);

export default axiosInstance;
