import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 80px;
  background: #b3a3a1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: #e9e6dc;
    text-align: center;

    /* to center the element: */
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
`;

export const Logo = styled.div`
  height: 100%;
  width: 30%;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: auto;
    margin-left: 5%;
    margin-right: 4%;
  }

  h1 {
    font-family: serif;
    font-weight: 800;
  }

  @media (max-width: 600px) {
    h1 {
      display: none;
    }
  }

  @media (max-width: 350px) {
    svg {
      display: none;
    }
  }
`;
