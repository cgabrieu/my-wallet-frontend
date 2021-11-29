/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Input from '../../components/Form/Input';
import FormButton from '../../components/Form/FormButton';
import Form from '../../components/Form/Form';
import ViewAuthentication from '../../components/ViewAuthentication';
import { postSignUp } from '../../services/api/api';
import Logo from '../../components/Logo';
import AlertContainer from '../../components/AlertContainer';

export default function SignUp() {
  const navigate = useNavigate();

  const alert = useAlert();

  const [inputFields, setInputFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeInputs(event) {
    setInputFields({ ...inputFields, [event.target.name]: event.target.value });
  }

  function submit(event) {
    event.preventDefault();
    if (inputFields.email.length < 5 || !inputFields.email.match(/@/)) {
      alert.show(<AlertContainer>Insira um e-mail válido</AlertContainer>);
      return;
    }
    if (inputFields.password.length < 8) {
      alert.show(<AlertContainer>Digite uma senha mais forte</AlertContainer>);
      return;
    }
    if (inputFields.name.length < 3) {
      alert.show(<AlertContainer>Insira um nome válido</AlertContainer>);
      return;
    }
    if (inputFields.password !== inputFields.confirmPassword) {
      alert.show(<AlertContainer>As senhas não combinam</AlertContainer>);
      return;
    }
    setIsLoading(true);
    postSignUp(inputFields)
      .then(() => navigate('/sign-in'))
      .catch(() => {
        setIsLoading(false);
        alert.error(<AlertContainer>Problema de conexão, tente novamente mais tarde</AlertContainer>);
      });
  }

  return (
    <ViewAuthentication>
      <Form onSubmit={submit}>
        <Logo />
        <div>
          <Input
            placeholder="Nome"
            type="text"
            name="name"
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

          <FormButton type="submit" isLoading={isLoading}>
            Cadastrar
          </FormButton>
        </div>
        <p onClick={() => navigate('/sign-in')}>
          Já tem uma conta? Entre agora!
        </p>
      </Form>
    </ViewAuthentication>
  );
}
