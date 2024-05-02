import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  display: flex;
  width: 100%;
  height: 84px;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 12px;

  button {
    margin-right: 12px;
    color: #fff;
    transition: color 0.2s;

    background: transparent;
    border: 0;

    z-index: 3;

    &:hover {
      color: ${shade(0.2, '#fff')};
    }
  }

  h1 {
    flex: 1;
    text-align: center;
  }
`;

export const Content = styled.main`
  max-width: 600px;
  margin: 0 auto;
`;

export const Item = styled.div`
  & + & {
    margin-top: 25px;
  }

  button {
    margin: 0;
  }

  h2 {
    margin-bottom: 5px;
  }
`;
