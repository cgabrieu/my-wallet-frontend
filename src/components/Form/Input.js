import styled from 'styled-components';

export default styled.input`
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 5px;
  width: 326px;
  height: 58px;
  outline: none;
  padding-left: 15px;
  margin-bottom: 15px;
  font-size: 1.1em;

  @media(max-width: 326px) {
    width: 100%;
    border-radius: 0px;
  }

  &::placeholder {
    color: black;
  }
`;
