import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://mywallet-cgabrieu.herokuapp.com"
      : "http://localhost:4000",
});

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function postSignIn(email, password) {
  return api.post("/auth/sign-in", {
    email,
    password,
  });
}

export function postSignUp(inputFields) {
  return api.post("/auth/sign-up", inputFields);
}

export function getTransactions(token) {
  return api.get("/transactions", getConfig(token));
}

export function postNewTransaction(value, description, token) {
  return api.post(
    "/transactions",
    {
      description,
      value,
    },
    getConfig(token)
  );
}

export function deleteTransaction(token, transactionId) {
  return api.delete(`/transactions/${transactionId}`, getConfig(token));
}