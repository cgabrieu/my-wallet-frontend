/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Form/Input';
import FormButton from '../../components/Form/FormButton';
import TitleMyWallet from '../../components/TitleMyWallet';
import Form from '../../components/Form/Form';
import ViewAuthentication from '../../components/ViewAuthentication';
import { postSignUp } from '../../services/api/api';

export default function SignUp() {
  const navigate = useNavigate();

  const [inputFields, setInputFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      setErrorMessage('Senhas não combinam.');
      setIsLoading(false);
      return;
    }
    postSignUp(inputFields)
      .then(() => navigate('/sign-in'))
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data);
      });
  }

  return (
    <ViewAuthentication>
      <Form onSubmit={submit}>
        <TitleMyWallet />
        <Input
          placeholder="Nome"
          type="text"
          name="name"
          minLength={3}
          maxLength={17}
          value={inputFields.name}
          onChange={handleChangeInputs}
        />
        <Input
          placeholder="E-mail"
          type="text"
          name="email"
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
        {errorMessage && (
        <span>
          {' '}
          {errorMessage}
          {' '}
        </span>
        )}
        <FormButton type="submit" isLoading={isLoading}>
          Cadastrar
        </FormButton>
        <p onClick={() => navigate('/sign-in')}>
          Já tem uma conta? Entre agora!
        </p>
      </Form>
    </ViewAuthentication>
  );
}
