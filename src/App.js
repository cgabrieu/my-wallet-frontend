import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import SignIn from './pages/public/SignIn';
import SignUp from './pages/public/SignUp';
import Wallet from './pages/private/Wallet';
import NewInput from './pages/private/NewInput';
import NewOutput from './pages/private/NewOutput';

import './assets/styles/reset.css';
import './assets/styles/style.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in" exact>
          <SignIn />
        </Route>
        <Route path="/sign-up" exact>
          <SignUp />
        </Route>
        <Route path="/" exact>
          <Wallet />
        </Route>
        <Route path="/new-input" exact>
          <NewInput />
        </Route>
        <Route path="/new-output" exact>
          <NewOutput />
        </Route>
      </Switch>
    </Router>
  );
}
