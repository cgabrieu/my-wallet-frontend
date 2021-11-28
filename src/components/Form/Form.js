import styled from 'styled-components';
import { Form } from 'formik';


export default styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-weight: bold;
    font-size: 15px;
    color: #FFF;
    margin: 30px;
    cursor: pointer;
  }

  span {
    font-weight: bold;
    color: #FFFFFF;
    margin-bottom: 7px;
  }

`;


