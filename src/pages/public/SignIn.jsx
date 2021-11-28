/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Input from '../../components/Form/Input';
import FormButton from '../../components/Form/FormButton';
import Form from '../../components/Form/Form';
import ViewAuthentication from '../../components/ViewAuthentication';
import { useAuth } from '../../contexts/AuthContext';
import { postSignIn } from '../../services/api/api';
import Logo from '../../components/Logo';
import AlertContainer from '../../components/AlertContainer';

export default function SignIn() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const alert = useAlert();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function submit(event) {
    event.preventDefault();

    if (email.length < 5 || !email.match(/@/)) {
      alert.show(<AlertContainer>Insira um e-mail válido</AlertContainer>);
      return;
    }

    if (!password.length) {
      alert.show(
        <AlertContainer>Sua senha não pode ficar em branco</AlertContainer>
      );
      return;
    }

    setIsLoading(true);
    postSignIn(email, password)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setIsLoading(false);
        navigate('/');
      })
      .catch(() => {
        alert.error(<AlertContainer>E-mail ou senha inválidos</AlertContainer>);
        setIsLoading(false);
      });
  }

  return (
    <ViewAuthentication>
      <Form onSubmit={submit}>
        <Logo />
        <div>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormButton type="submit" isLoading={isLoading}>
            Entrar
          </FormButton>
        </div>
        <p onClick={() => navigate('/sign-up')}>Primeira vez? Cadastre-se!</p>
      </Form>
    </ViewAuthentication>
  );
}
