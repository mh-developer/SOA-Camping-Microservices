import axios from "axios";

const http = axios.create({
  baseURL: "http://studentdocker.informatika.uni-mb.si:27777/api", //"http://studentdocker.informatika.uni-mb.si:32964",//process.env.REACT_APP_SPACES_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const url = "/reservations";
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

export const ReservationService = {
  getAll,
  get,
  create,
  update,
  remove,
};
