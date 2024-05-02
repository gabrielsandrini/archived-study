import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 600px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  height: 84px;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 12px;

  a {
    margin-left: 12px;
    color: #fff;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#fff')};
    }
  }

  h1 {
    flex: 1;
    text-align: center;
  }
`;
