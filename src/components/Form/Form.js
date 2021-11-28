import styled from 'styled-components';

export default styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-weight: bold;
    font-size: 15px;
    color: #fff;
    margin: 30px;
    cursor: pointer;
  }

  span {
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 7px;
  }

  > div {
    background-color: #fff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    @media (max-width: 326px) {
      width: 100%;
      border-radius: 0px;
    }
  }
`;
