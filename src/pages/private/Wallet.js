import { useEffect, useState } from 'react';
import { IoMdExit, IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import dayjs from 'dayjs';

import PageContainer from '../../components/PageContainer';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/Button';
import { getTransactions } from '../../services/api/api';

export default function Wallet({ user, logout }) {
    const history = useHistory();

    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        getTransactions(user.token)
            .then((res) => {
                console.log(res.data);
                setTransactions(res.data);
            }).then(() => {
                if (transactions.length)
                    setBalance(transactions.map((t) => t.value).reduce((a,b) => a+b));
                else setBalance(0);
            });
    }, []);

    const toLocaleValue = (value) => {
        return (value*0.01).toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' });
    };

    return (
        <PageContainer>
            <TitlePage>
                Olá, {user.name}
                <IoMdExit
                    onClick={() => logout()}
                />
            </TitlePage>
            <LogsContainer>
                {(transactions.length) ?
                    <>
                        <Content>
                            {transactions.map((t,index) =>
                                <Item key={index}>
                                    <div>
                                        <span>
                                            {dayjs(t.createdAt).format('DD/MM')}
                                        </span>
                                        <h4>{t.description}</h4>
                                    </div>
                                    <Valor positive={t.value > 0}>
                                        {toLocaleValue(t.value)}
                                    </Valor>
                                </Item>
                            )}
                        </Content>
                        <WalletBalance positive={balance > 0}>
                            <b>SALDO</b>
                            <span>{toLocaleValue(balance)}</span>
                        </WalletBalance>
                    </> :
                    <NoDataInfo>
                        <h2>Não há registros de entrada ou saída</h2>
                    </NoDataInfo>
                }
            </LogsContainer>
            <ButtonContainer>
                <WalletButton onClick={() => history.push("/new-input")}>
                    <IoIosAddCircleOutline />
                    Nova entrada
                </WalletButton>
                <WalletButton onClick={() => history.push("/new-output")}>
                    <IoIosRemoveCircleOutline />
                    Nova saída
                </WalletButton>
            </ButtonContainer>
        </PageContainer>
    )
};

const ButtonContainer = styled.div`
    height: 19vh;
    display: flex;
    justify-content: space-between;
`;

const WalletButton = styled(Button)`
    width: calc(100%/2 - 7px);
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
    min-height: 500px;
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
    background-color: #FFFFFF;
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
    span {
        margin-right: 10px;
        color: #C6C6C6;
    }
    div {
        display: flex;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(70%);
    }
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
`;

const Valor = styled.b`
    color: ${props => props.positive ? "#03AC00" : "#C70000"};
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
        color: ${props => props.positive ? "#03AC00" : "#C70000"};
    }
`;