import React from 'react';

import { GiCandlestickPhone } from 'react-icons/gi';
import { Container, Logo } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Logo>
        <GiCandlestickPhone color="#FBF9F3" size="80%" />
        <h1>TELZIR</h1>
      </Logo>
      <h2>Preço de chamadas</h2>
      <span />
    </Container>
  );
};

export default Header;
