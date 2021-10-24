import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import SignIn from './pages/public/SignIn';
import SignUp from './pages/public/SignUp';
import Wallet from './pages/private/Wallet';
import NewInput from './pages/private/NewInput';
import NewOutput from './pages/private/NewOutput';

import './assets/styles/reset.css';
import './assets/styles/style.css';

export default function App() {
	const { user } = useAuth();

	return (
		<Router>
			<Switch>
				{!user ?
					<Switch>
						<Route component={SignUp} path="/sign-up" exact />
						<Route component={SignIn} path="/sign-in" exact />
						<Redirect to="/sign-in" />
					</Switch> :
					<Switch>
						<Route component={Wallet} path="/" exact />
						<Route component={NewInput} path="/new-input" exact />
						<Route component={NewOutput} path="/new-output" exact />
						<Redirect to="/" />
					</Switch>
				}
			</Switch>
		</Router>
	);

}
