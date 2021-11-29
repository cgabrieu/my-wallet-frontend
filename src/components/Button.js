import styled from "styled-components";

export default styled.button`
  width: 326px;
  border: none;
  padding: 16px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;

  @media(max-width: 326px) {
    width: 100%;
    border-radius: 0px;
  }
`;
