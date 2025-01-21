import axios, { AxiosError, AxiosInstance } from "axios";
import { AuthAPI, newAuthAPI } from './auth';
import { LS_TOKEN, LS_USER_DATA } from './constants/local-storage-key';

class APIContainer {
  #httpClient: AxiosInstance;
  #auth: AuthAPI | undefined = undefined;

  constructor(
    httpClient: AxiosInstance,
  ) {
    this.#httpClient = httpClient;
  }

  get auth() {
    if (!this.#auth) {
      this.#auth = newAuthAPI(this.#httpClient);
    }
    return this.#auth;
  }
}

export const httpClient = axios.create({
  baseURL: '/api',
});

httpClient.interceptors.request.use((value) => {
  value.headers.set("Authorization", `Bearer ${localStorage.getItem(LS_TOKEN)}`);

  return value;
});

httpClient.interceptors.response.use((value) => {
  return value;
},
(error) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401 && !error.response.config.url?.includes('auth')) {
      window.alert(error.response.data?.message);
      localStorage.removeItem(LS_TOKEN);
      localStorage.removeItem(LS_USER_DATA);
      window.location.assign('/auth/login');
    }
  }
  throw error;
});

const api = new APIContainer(httpClient);

export default api;