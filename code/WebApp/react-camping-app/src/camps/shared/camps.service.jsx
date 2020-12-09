import http from "../../core/http-requests";

const getAll = () => {
  return http.get("/Camps");
};

const get = (id) => {
  return http.get(`/Camps/${id}`);
};

const create = (data) => {
  return http.post("/Camps", data);
};

const update = (id, data) => {
  return http.put(`/Camps/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/Camps/${id}`);
};

export const CampService = {
  getAll,
  get,
  create,
  update,
  remove,
};
