/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import baseURL from "./CutomizeAxios";

function axiosGet(url: string, action?: any) {
  return baseURL.get(url, action);
}

function axiosDelete(url: string, action?: any) {
  return baseURL.delete(url, action);
}

function axiosPut(url: string, action: any) {
  return baseURL.put(url, action);
}
function axiosPost(url: string, action: any) {
  return baseURL.post(url, action);
}

export { axiosGet, axiosDelete, axiosPut, axiosPost };
