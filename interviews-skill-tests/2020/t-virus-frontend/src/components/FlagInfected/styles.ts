import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ModalContent = styled.div`
  h1 {
    text-align: center;
    margin: 20px 0;
  }

  form > div {
    width: 80%;
    margin: 0 auto;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  flex-flow: row-reverse;

  padding-top: 5%;

  button {
    width: 30%;
  }
`;
