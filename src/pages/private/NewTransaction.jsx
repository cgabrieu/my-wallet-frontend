import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import View from '../../components/View';
import TitlePage from '../../components/TitlePage';
import FormButton from '../../components/Form/FormButton';
import Input from '../../components/Form/Input';
import Form from '../../components/Form/Form';
import { formatBRLInput } from '../../utils/formatCurrencies';
import { postNewTransaction } from '../../services/api/api';
import { useAuth } from '../../contexts/AuthContext';

export default function NewTransaction({ type }) {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const formatTransactionValue = (transactionValue) => {
    const clearValue = transactionValue
      .replace('R$ ', '')
      .replaceAll('.', '')
      .replaceAll(',', '');
    if (type === 'Entrada') return Number(clearValue);
    return Number(clearValue) * -1;
  };

  function submit(event) {
    event.preventDefault();
    if (formatTransactionValue(value) === 0) {
      setErrorMessage('O valor precisa ser maior que zero.');
      return;
    }
    setIsLoading(true);
    postNewTransaction(formatTransactionValue(value), description, user.token)
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
      <TitlePage>
        Nova
        {' '}
        {type}
      </TitlePage>
      <Form onSubmit={submit}>
        <Input
          placeholder="Valor"
          type="text"
          maxLength="13"
          value={formatBRLInput(value)}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          placeholder="Descrição"
          type="text"
          maxLength="20"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errorMessage && (
        <span>
          {' '}
          {errorMessage}
          {' '}
        </span>
        )}
        <FormButton type="submit" isLoading={isLoading}>
          Salvar
          {' '}
          {type}
        </FormButton>
      </Form>
    </View>
  );
}
