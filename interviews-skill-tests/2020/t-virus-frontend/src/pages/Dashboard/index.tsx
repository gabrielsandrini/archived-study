import React, { useState, useCallback } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import LocationPicker from '../../components/LocationPicker';
import { Container, Content, Header, Item } from './styles';
import { useAuth } from '../../hooks/auth';
import Button from '../../components/Button';
import FlagInfected from '../../components/FlagInfected';

const Dashboard: React.FC = () => {
  const [lastLocation, setLastLocation] = useState('');

  const history = useHistory();
  const { signOut, user } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
    history.replace('/', []);
  }, [history, signOut]);

  return (
    <Container>
      <Header>
        <h1>Welcome, {user.name}</h1>
        <button type="button" title="Sign Out" onClick={handleSignOut}>
          <FiLogOut size={24} />
        </button>
      </Header>
      <Content>
        <Item>
          <h2>Flag Infected:</h2>
          <FlagInfected />
        </Item>

        <Item>
          <h2>Trade Items:</h2>
          <Button>Trade Items</Button>
        </Item>

        <Item>
          <h2>Last Location:</h2>
          <LocationPicker
            setLocationCallback={setLastLocation}
            lastLocation={lastLocation}
          />
        </Item>

        <Item>
          <h2>See Reports:</h2>
          <Button color="#1e751a" textColor="#fff">
            See reports
          </Button>
        </Item>
      </Content>
    </Container>
  );
};

export default Dashboard;
