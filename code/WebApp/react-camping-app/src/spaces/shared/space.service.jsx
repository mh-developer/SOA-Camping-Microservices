import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:5000",//"http://studentdocker.informatika.uni-mb.si:32964",//process.env.REACT_APP_SPACES_API_URL,
	headers: {
	  "Content-type": "application/json",
	},
  });

const getAll = () => {
  return http.get("/Spaces");
};

const get = (id) => {
  return http.get(`/Spaces/${id}`);
};

const create = (data) => {
  return http.post("/Spaces", data);
};

const update = (id, data) => {
  return http.put(`/Spaces/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/Spaces/${id}`);
};

export const SpaceService = {
  getAll,
  get,
  create,
  update,
  remove,
};
