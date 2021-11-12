import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import SignIn from './pages/public/SignIn';
import SignUp from './pages/public/SignUp';
import Wallet from './pages/private/Wallet';
import NewTransaction from './pages/private/NewTransaction';

import './assets/styles/reset.css';
import './assets/styles/style.css';

export default function App() {
	const { user, logout } = useAuth();
	//só pra testar cara
	return (
		<Router>
			{!user ?
				<Switch>
					<Route component={SignUp} path="/sign-up" exact />
					<Route component={SignIn} path="/sign-in" exact />
					<Redirect to="/sign-in" />
				</Switch> :
				<Switch>
					<Route path="/" exact>
						<Wallet user={user} logout={logout} />
					</Route>
					<Route path="/new-input" exact>
						<NewTransaction user={user} type={"Entrada"} />
					</Route>
					<Route path="/new-output" exact>
						<NewTransaction user={user} type={"Saída"} />
					</Route>
					<Redirect to="/" />
				</Switch>
			}
		</Router>
	);

}
