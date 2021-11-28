import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://gratibox-b.herokuapp.com'
      : 'http://localhost:4000',
});

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function postSignIn(email, password) {
  return api.post('/auth/signin', {
    email,
    password
  });
}

export function postSignUp(inputFields) {
  return api.post('/auth/signup', inputFields);
}

export function getTransactions(token) {
  return api.get('/transactions', getConfig(token));
}

export function postNewTransaction(value, description, token) {
  return api.post('/transactions', {
    description,
    value
  }, getConfig(token));
}