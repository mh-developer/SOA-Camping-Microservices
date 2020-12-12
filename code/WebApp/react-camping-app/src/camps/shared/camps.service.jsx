import http from "../../core/http-requests";

const getAll = (accessToken) => {
  return http.get("/Camps", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

const get = (id, accessToken) => {
  return http.get(`/Camps/${id}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

const create = (data, accessToken) => {
  return http.post("/Camps", data, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

const update = (id, data, accessToken) => {
  return http.put(`/Camps/${id}`, data, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

const remove = (id, accessToken) => {
  return http.delete(`/Camps/${id}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

export const CampService = {
  getAll,
  get,
  create,
  update,
  remove,
};
