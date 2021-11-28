/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Form/Input';
import FormButton from '../../components/Form/FormButton';
import Form from '../../components/Form/Form';
import ViewAuthentication from '../../components/ViewAuthentication';
import { useAuth } from '../../contexts/AuthContext';
import { postSignIn } from '../../services/api/api';
import Logo from '../../components/Logo';

export default function SignIn() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function submit(event) {
    event.preventDefault();
    setIsLoading(true);
    postSignIn(email, password)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setIsLoading(false);
        navigate('/');
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  return (
    <ViewAuthentication>
      <Form onSubmit={submit}>
        <Logo />
        <Input
          placeholder="E-mail"
          type="email"
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
        <p onClick={() => navigate('/sign-up')}>Primeira vez? Cadastre-se!</p>
      </Form>
    </ViewAuthentication>
  );
}
