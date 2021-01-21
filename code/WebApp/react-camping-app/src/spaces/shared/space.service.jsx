import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_SPACES_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const getHead = (token) => ({
  headers: {
    Authorization: "Bearer " + token,
  },
});

const url = "/Spaces";
const getAll = (accessToken) => {
  console.log(getHead(accessToken));

  return http.get(url, getHead(accessToken));
};

const get = (id, accessToken) => {
  return http.get(`${url}/${id}`, getHead(accessToken));
};

const create = (data, accessToken) => {
  return http.post(url, data, getHead(accessToken));
};

const update = (id, data, accessToken) => {
  return http.put(`${url}/${id}`, data, getHead(accessToken));
};

const remove = (id, accessToken) => {
  return http.delete(`${url}/${id}`, getHead(accessToken));
};

export const SpaceService = {
  getAll,
  get,
  create,
  update,
  remove,
};
