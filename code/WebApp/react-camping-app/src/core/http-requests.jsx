import axios from "axios";

export default axios.create({
  baseURL: "http://studentdocker.informatika.uni-mb.si:27000/api",//process.env.REACT_APP_CAMPS_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});
