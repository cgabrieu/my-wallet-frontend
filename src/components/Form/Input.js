import styled from 'styled-components';

export default styled.input`
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 5px;
  max-width: 326px;
  height: 58px;
  width: 95%;
  outline: none;
  padding-left: 15px;
  margin-bottom: 15px;
  font-size: 1.1em;

  @media(max-width: 326px) {
    
  }

  &::placeholder {
    color: black;
  }
`;
