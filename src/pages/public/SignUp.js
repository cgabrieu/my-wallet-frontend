import Input from '../../components/Form/Input';
import FormButton from '../../components/Form/FormButton';
import TitleMyWallet from '../../components/TitleMyWallet';
import Form from '../../components/Form/Form';
import ViewAuthentication from '../../components/ViewAuthentication';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function SignUp() {
	const history = useHistory();

	const [inputFields, setInputFields] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	function handleChangeInputs(event) {
		setInputFields({ ...inputFields, [event.target.name]: event.target.value });
	}

	function submit(event) {
		event.preventDefault();
	}

	return (
		<ViewAuthentication>
			<Form onSubmit={submit}>
				<TitleMyWallet />
				<Input
					placeholder="Nome"
					type="text"
					name="name"
					value={inputFields.name}
					onChange={handleChangeInputs}
				/>
				<Input
					placeholder="E-mail"
					type="text"
					name="email"
					value={inputFields.email}
					onChange={handleChangeInputs}
				/>
				<Input
					placeholder="Senha"
					type="password"
					name="password"
					value={inputFields.password}
					onChange={handleChangeInputs}
				/>
				<Input
					placeholder="Confirme a senha"
					type="password"
					name="confirmPassword"
					value={inputFields.confirmPassword}
					onChange={handleChangeInputs}
				/>
				<FormButton type="submit">Cadastrar</FormButton>
				<p onClick={() => history.push("/sign-in")}>Já tem uma conta? Entre agora!</p>
			</Form>
		</ViewAuthentication>
	)
};