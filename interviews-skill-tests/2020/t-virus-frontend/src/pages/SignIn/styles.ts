import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  form {
    display: flex;

    > div {
      width: 60%;
    }
    button {
      height: 56px;
      width: 30%;
      margin-top: 0;
      margin-left: 10px;
    }
  }
`;
export const FormContainer = styled.main`
  margin: 10% auto;
  width: 60%;
  justify-items: center;
  text-align: center;

  h1 {
    margin-bottom: 15px;
  }
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  div {
    display: flex;
    align-items: center;
    position: relative;
    text-align: center;
    justify-content: stretch;

    span {
      width: 60%;
      font-size: 32px;
    }

    a {
      width: 20%;
      margin: 20px 0;
    }
  }
`;
