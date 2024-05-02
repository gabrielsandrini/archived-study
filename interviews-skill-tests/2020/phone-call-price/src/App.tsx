import React from 'react';
import Home from './pages/Home';

import Header from './components/Header';
import Footer from './components/Footer';

import GlobalStyle from './styles/global';
import { Container } from './styles/AppContainer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Home />
      </Container>
      <Footer />
      <GlobalStyle />
    </>
  );
};

export default App;
