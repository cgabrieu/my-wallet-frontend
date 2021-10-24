import styled from 'styled-components';
import { IoMdExit, IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';

import { useHistory } from 'react-router';

import PageContainer from '../../components/PageContainer';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';

export default function Wallet() {

    const { logout } = useAuth();

    const history = useHistory();

    let list = [];

    return (
        <PageContainer>
            <TitlePage>
                Olá, Fulano
                <IoMdExit 
                    onClick={() => logout()}
                />
            </TitlePage>
            <LogsContainer>
                {(list.length) ?
                    <>
                        <Content>

                        </Content>
                        <WalletBalance positive>
                            <b>SALDO</b>
                            <span>2965,60</span>
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
    display: flex;
    justify-content: space-between;
`;

const WalletButton = styled(Button)`
    height: 16vh;
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
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 13px;
    display: flex;
    height: 70vh;
    flex-direction: column;
    justify-content: space-between;
`;

const Content = styled.div`
    margin: 21px 12px 0px 12px;
    overflow: auto;
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