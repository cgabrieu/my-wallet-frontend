import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  text-transform: initial;
  height: 60px;
  > button {
    margin-top: 10px;
    border: none;
    padding: 5px;
    background-color: #fff;
    color: #2e2e2e;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
  }
  @media (max-width: 350px) {
    font-size: 12px;
  }
`;
