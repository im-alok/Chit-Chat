import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (
  url: string,
  method: string,
  body: any,
  headers: any,
  params: any,
) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: body ? body : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
