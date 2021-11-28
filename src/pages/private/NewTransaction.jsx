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

export default function NewTransaction({ type }) {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const alert = useAlert();

  const { user, logout } = useAuth();

  const formatTypeValue = () => {
    if (type === 'Saída') return (value * -1);
    return value;
  };

  function submit(event) {
    event.preventDefault();
    if (value <= 0) {
      alert.show('O valor precisa ser maior que zero');
      return;
    }
    if (description.length < 3) {
      alert.show('Digite uma descrição válida');
      return;
    }
    setIsLoading(true);
    postNewTransaction(formatTypeValue(), description, user.token)
      .then(() => {
        setIsLoading(false);
        navigate('/');
      })
      .catch(() => {
        setIsLoading(false);
        logout();
      });
  }

  return (
    <View>
      <TitlePage>{`Nova ${type}`}</TitlePage>
      <Form onSubmit={submit}>
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
      </Form>
    </View>
  );
}
