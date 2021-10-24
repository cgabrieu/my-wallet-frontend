import Input from '../../components/Form/Input';
import FormButton from '../../components/Form/FormButton';
import TitleMyWallet from '../../components/TitleMyWallet';
import Form from '../../components/Form/Form';
import ViewAuthentication from '../../components/ViewAuthentication';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { postSignIn } from '../../services/api/sign-in';


export default function SignIn() {
	const history = useHistory();

	const { user, setUser } = useAuth();

	console.log("Token: ", user);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function submit(event) {
		event.preventDefault();
		postSignIn(email, password)
			.then((res) => {
				console.log(res);
				setUser(res);
				localStorage.setItem('user', JSON.stringify(res));
				history.push("/");
			});
	}

	return (
		<ViewAuthentication>
			<Form onSubmit={submit}>
				<TitleMyWallet />
				<Input
					placeholder="E-mail"
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<Input
					placeholder="Senha"
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<FormButton type="submit">Entrar</FormButton>
				<p onClick={() => history.push("/sign-up")}>Primeira vez? Cadastre-se!</p>
			</Form>
		</ViewAuthentication>
	)
};