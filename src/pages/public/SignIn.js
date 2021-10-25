import Input from '../../components/Form/Input';
import FormButton from '../../components/Form/FormButton';
import TitleMyWallet from '../../components/TitleMyWallet';
import Form from '../../components/Form/Form';
import ViewAuthentication from '../../components/ViewAuthentication';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { postSignIn } from '../../services/api/api';

export default function SignIn() {
	const history = useHistory();

	const { setUser } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	function submit(event) {
		event.preventDefault();
		setIsLoading(true);
		postSignIn(email, password)
			.then((res) => {
				setUser(res.data);
				localStorage.setItem('user', JSON.stringify(res.data));
				setIsLoading(false);
				history.push("/");
			}).catch((err) => {
				setErrorMessage(err.response.data);
				setIsLoading(false);
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
				{errorMessage && (
					<span> {errorMessage} </span>
				)}
				<FormButton type="submit" isLoading={isLoading}>
					Entrar
				</FormButton>
				<p onClick={() => history.push("/sign-up")}>
					Primeira vez? Cadastre-se!
				</p>
			</Form>
		</ViewAuthentication>
	)
};