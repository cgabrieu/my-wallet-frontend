import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import SignIn from './pages/public/SignIn';
import SignUp from './pages/public/SignUp';

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
      </Switch>
    </Router>
  );
}
