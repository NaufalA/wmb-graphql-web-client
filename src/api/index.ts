import axios, { AxiosInstance } from "axios";
import { AuthAPI, newAuthAPI } from './auth';
import { LS_TOKEN } from './constants/local-storage-key';

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

const httpClient = axios.create({
  baseURL: '/api',
});

httpClient.interceptors.request.use((value) => {
  value.headers.set("Authorization", localStorage.getItem(LS_TOKEN));

  return value;
});

const api = new APIContainer(httpClient);

export default api;