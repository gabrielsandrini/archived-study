import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 5%;
  background: #7f6e6c;

  @media (max-width: 650px) {
    display: none;
  }
`;
