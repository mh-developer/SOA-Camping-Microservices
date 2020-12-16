import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_ACTIVITIES_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const url = "/activities";
const getAll = () => {
  return http.get(url);
};

const get = (id) => {
  return http.get(`${url}/${id}`);
};

const create = (data) => {
  return http.post(url, data);
};

const update = (id, data) => {
  return http.put(`${url}/${id}`, data);
};

const remove = (id) => {
  return http.delete(`${url}/${id}`);
};

export const ActivityService = {
  getAll,
  get,
  create,
  update,
  remove,
};
