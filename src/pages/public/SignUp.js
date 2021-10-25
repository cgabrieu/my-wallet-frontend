import Input from '../../components/Form/Input';
import FormButton from '../../components/Form/FormButton';
import TitleMyWallet from '../../components/TitleMyWallet';
import Form from '../../components/Form/Form';
import ViewAuthentication from '../../components/ViewAuthentication';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { postSignUp } from '../../services/api/api';

export default function SignUp() {
	const history = useHistory();

	const [inputFields, setInputFields] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	function handleChangeInputs(event) {
		setInputFields({ ...inputFields, [event.target.name]: event.target.value });
	}

	function submit(event) {
		event.preventDefault();
		setIsLoading(true);
		if (inputFields.password !== inputFields.confirmPassword) {
			setErrorMessage("Senhas não combinam.");
			setIsLoading(false);
			return;
		}
		postSignUp(inputFields)
			.then((res) => {
				console.log(res);
				history.push("/sign-in");
			}).catch((err) => {
				setIsLoading(false);
				setErrorMessage(err.response.data);
			});
	}

	return (
		<ViewAuthentication>
			<Form onSubmit={submit}>
				<TitleMyWallet />
				<Input
					required
					placeholder="Nome"
					type="text"
					name="name"
					minLength={3}
					maxLength={17}
					value={inputFields.name}
					onChange={handleChangeInputs}
				/>
				<Input 
					required
					placeholder="E-mail"
					type="text"
					name="email"
					value={inputFields.email}
					onChange={handleChangeInputs}
				/>
				<Input
					required
					placeholder="Senha"
					type="password"
					name="password"
					value={inputFields.password}
					onChange={handleChangeInputs}
				/>
				<Input
					required
					placeholder="Confirme a senha"
					type="password"
					name="confirmPassword"
					value={inputFields.confirmPassword}
					onChange={handleChangeInputs}
				/>
				{errorMessage && (
					<span> {errorMessage} </span>
				)}
				<FormButton type="submit" isLoading={isLoading}>
					Cadastrar
				</FormButton>
				<p onClick={() => history.push("/sign-in")}>Já tem uma conta? Entre agora!</p>
			</Form>
		</ViewAuthentication>
	)
};