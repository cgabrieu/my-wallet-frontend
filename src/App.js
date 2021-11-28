import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/public/SignIn";
import SignUp from "./pages/public/SignUp";
import Wallet from "./pages/private/Wallet";
import NewTransaction from "./pages/private/NewTransaction";

import "./assets/styles/reset.css";
import "./assets/styles/style.css";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Wallet user={user} logout={logout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-input"
          element={
            <PrivateRoute>
              <NewTransaction user={user} type={"Entrada"} />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-output"
          element={
            <PrivateRoute>
              <NewTransaction user={user} type={"Saída"} />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
