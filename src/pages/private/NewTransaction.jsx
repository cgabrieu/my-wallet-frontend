/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { useAlert } from 'react-alert';
import View from '../../components/View';
import TitlePage from '../../components/TitlePage';
import FormButton from '../../components/Form/FormButton';
import Input from '../../components/Form/Input';
import Form from '../../components/Form/Form';
import { postNewTransaction } from '../../services/api/api';
import { useAuth } from '../../contexts/AuthContext';
import AlertContainer from '../../components/AlertContainer';

export default function NewTransaction({ type }) {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const alert = useAlert();

  const { user, logout } = useAuth();

  const formatTypeValue = () => {
    if (type === 'Saída') return value * -100;
    return value * 100;
  };

  function submit(event) {
    event.preventDefault();
    if (value <= 0) {
      alert.show(
        <AlertContainer>O valor precisa ser maior que zero</AlertContainer>
      );
      return;
    }
    if (description.length < 3) {
      alert.show(<AlertContainer>Digite uma descrição válida</AlertContainer>);
      return;
    }
    setIsLoading(true);
    postNewTransaction(formatTypeValue(), description, user.token)
      .then(() => {
        setIsLoading(false);
        navigate('/');
      })
      .catch((err) => {
        alert.error(<AlertContainer>Ocorreu um erro :(</AlertContainer>);
        setIsLoading(false);
        if (err.response?.status === 401) logout();
      });
  }

  return (
    <View>
      <TitlePage>{`Nova ${type}`}</TitlePage>
      <Form onSubmit={submit}>
        <div>
          <NumberFormat
            placeholder="Valor (R$)"
            value={value}
            customInput={Input}
            maxLength="15"
            prefix="R$ "
            decimalScale={2}
            decimalSeparator=","
            thousandSeparator="."
            fixedDecimalScale
            onValueChange={(e) => setValue(e.floatValue)}
          />
          <Input
            placeholder="Descrição"
            type="text"
            maxLength="20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormButton type="submit" isLoading={isLoading}>
            {`Salvar ${type}`}
          </FormButton>
        </div>
      </Form>
    </View>
  );
}
