import axios from "axios";
import {API_URL} from '../baseurl'
const register = (name, email, password,password_confirmation) => {
  return axios.post(API_URL + "teachersignup", {
    name,
    email,
    password,
    password_confirmation
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "teachersignin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      

      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export default {
  register,
  login,
  logout,
  getCurrentUser,
};