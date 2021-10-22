import styled from 'styled-components';

export default function PageContainer({ children }) {
  return (
    <Container>
      {children}
    </Container>
  )
}


const Container = styled.div`
  padding: 20px;
  height: 100%;
`;
