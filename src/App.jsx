import './assets/styles/reset.css';
import './assets/styles/style.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import SignIn from './pages/public/SignIn';
import SignUp from './pages/public/SignUp';
import Wallet from './pages/private/Wallet';
import NewTransaction from './pages/private/NewTransaction';
import PrivateRoute from './utils/PrivateRoute';

const AnimatedSwitch = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="alert" timeout={300}>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Wallet />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-input"
            element={
              <PrivateRoute>
                <NewTransaction type="Entrada" />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-output"
            element={
              <PrivateRoute>
                <NewTransaction type="Saída" />
              </PrivateRoute>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedSwitch />
    </BrowserRouter>
  );
}
