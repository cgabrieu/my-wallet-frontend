import Input from '../../components/Form/Input';
import FormButton from '../../components/Form/FormButton';
import TitleMyWallet from '../../components/TitleMyWallet';
import Form from '../../components/Form/Form';
import ViewAuthentication from '../../components/ViewAuthentication';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function SignIn() {
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function submit(event) {
		event.preventDefault();
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