import styled from 'styled-components';

export default styled.input`
  border: 3px solid hsl(0, 0%, 80%);
  border-radius: 5px;
  width: 326px;
  height: 58px;
  outline: none;
  padding-left: 15px;
  margin-bottom: 0.6em;
  font-size: 1.1em;
  background-color: #e8e8e8;

  @media(max-width: 326px) {
    width: 100%;
    border-radius: 0px;
  }

  &::placeholder {
    color: black;
  }
`;
