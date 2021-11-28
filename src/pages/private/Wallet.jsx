import React, { useEffect, useState } from 'react';
import {
  IoMdExit,
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import dayjs from 'dayjs';
import PageContainer from '../../components/PageContainer';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/Button';
import { deleteTransaction, getTransactions } from '../../services/api/api';
import formatBRL from '../../utils/formatCurrencies';
import { useAuth } from '../../contexts/AuthContext';

export default function Wallet() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [render, setRender] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  // console.log(transactionId);

  useEffect(() => {
    getTransactions(user.token)
      .then((res) => setTransactions(res.data))
      .catch(() => logout());
  }, [render]);

  // eslint-disable-next-line no-unused-vars
  function removeTransaction() {
    deleteTransaction(user.token, transactionId).then(() => setRender(!render));
  }

  return (
    <PageContainer>
      <TitlePage>
        {`Olá, ${user.name}`}
        <IoMdExit onClick={() => logout()} />
      </TitlePage>
      <ReactTooltip effect="solid" clickable>
        <RemoveTransaction onClick={removeTransaction}>
          Clique aqui para remover a transação
        </RemoveTransaction>
      </ReactTooltip>
      <LogsContainer>
        {transactions.length ? (
          <>
            <Content>
              {transactions.map((t) => (
                <Item
                  key={t.id}
                  data-tip
                  data-event="click"
                  onClick={() => setTransactionId(t.id)}
                >
                  <div>
                    <span>{dayjs(t.createdAt).format('DD/MM')}</span>
                    <h4>{t.description}</h4>
                  </div>
                  <Valor positive={t.value > 0}>{formatBRL(t.value)}</Valor>
                </Item>
              ))}
            </Content>
            <WalletBalance
              positive={
                transactions.map((t) => t.value).reduce((a, b) => a + b) > 0
              }
            >
              <b>SALDO</b>
              <span>
                {formatBRL(
                  transactions.map((t) => t.value).reduce((a, b) => a + b)
                )}
              </span>
            </WalletBalance>
          </>
        ) : (
          <NoDataInfo>
            <h2>Não há registros de entrada ou saída</h2>
          </NoDataInfo>
        )}
      </LogsContainer>
      <ButtonContainer>
        <WalletButton onClick={() => navigate('/new-input')}>
          <IoIosAddCircleOutline />
          Nova entrada
        </WalletButton>
        <WalletButton onClick={() => navigate('/new-output')}>
          <IoIosRemoveCircleOutline />
          Nova saída
        </WalletButton>
      </ButtonContainer>
    </PageContainer>
  );
}

const RemoveTransaction = styled.h3`
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 16px;
  @media (max-width: 350px) {
    font-size: 12px;
  }
`;

const ButtonContainer = styled.div`
  height: 19vh;
  display: flex;
  justify-content: space-between;
`;

const WalletButton = styled(Button)`
  width: calc(100% / 2 - 7px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.2em;
  padding: 10px;
  padding-right: 60px;
  text-align: left;
  border-radius: 5px;
  svg {
    font-size: 25px;
  }
`;

const NoDataInfo = styled.div`
  font-size: 20px;
  color: #868686;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    width: 250px;
    text-align: center;
  }
`;

const LogsContainer = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 13px;
  display: flex;
  height: 67vh;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.ul`
  font-size: 16px;
  margin: 21px 12px 0px 12px;
  overflow: auto;
  @media (max-width: 350px) {
    font-size: 14px;
  }
`;

const Item = styled.li`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  cursor: pointer;
  span {
    margin-right: 10px;
    color: #c6c6c6;
  }
  div {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(70%);
  }
`;

const Valor = styled.b`
  color: ${(props) => (props.positive ? '#03AC00' : '#C70000')};
`;

const WalletBalance = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 15px;
  font-size: 17px;
  b {
    font-weight: bold;
  }
  span {
    color: ${(props) => (props.positive ? '#03AC00' : '#C70000')};
    font-weight: bold;
  }
`;
