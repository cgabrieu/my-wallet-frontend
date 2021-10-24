import axios from "axios";

const BASE_URL = 'http://localhost:4000/api';

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function postSignIn(email, password) {
  return axios.post(BASE_URL + '/auth/signin', {
    email,
    password
  });
}

export function getTransactions(token) {
  return axios.get(BASE_URL + '/transactions', getConfig(token));
}

export function postNewTransaction(value, description, token) {
  return axios.post(BASE_URL + '/transactions', {
    description,
    value
  }, getConfig(token));
}