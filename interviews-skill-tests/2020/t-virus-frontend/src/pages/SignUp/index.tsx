import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Header, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LocationPicker from '../../components/LocationPicker';
import InventoryPicker from '../../components/InventoryPicker';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface Inventory {
  'Fiji Water': number;
  'Campbell Soup': number;
  'First Aid Pouch': number;
  AK47: number;
}

interface SignUpFormData {
  name: string;
  age: number;
  gender: 'M' | 'F';
}

interface SignUpRequestData extends SignUpFormData {
  location: string;
  inventory: Inventory;
}

const SignUp: React.FC = () => {
  const [lastLocation, setLastLocation] = useState('');
  const [inventory, setInventory] = useState<Inventory>({
    'Fiji Water': 0,
    'Campbell Soup': 0,
    'First Aid Pouch': 0,
    AK47: 0,
  });

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          age: Yup.number().min(0, 'age must be greater than 0'),
          gender: Yup.string().equals(['M', 'F']),
        });

        await schema.validate(data, { abortEarly: false });

        const requestData: SignUpRequestData = Object.assign(
          data,
          { inventory },
          { location: lastLocation },
        );

        await api.post('/people.json', requestData);

        addToast({
          type: 'success',
          title: 'Success',
          description: 'you can now log-in using your name',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'An error has occurred',
          description: 'An error has occurred. Please try again',
        });
      }
    },
    [addToast, history, inventory, lastLocation],
  );

  return (
    <Container>
      <Header>
        <Link to="/">
          <FiArrowLeft size={38} />
        </Link>
        <h1>Sign Up</h1>
      </Header>
      <Content>
        <Form onSubmit={handleSubmit} ref={formRef} data-testid="form-element">
          <Input name="name" placeholder="Name" />
          <Input name="age" placeholder="Age" type="number" />
          <Input name="gender" placeholder="Gender: M or F" list="gender" />

          <LocationPicker
            setLocationCallback={setLastLocation}
            lastLocation={lastLocation}
          />
          <InventoryPicker
            inventory={inventory}
            setInventoryCallback={setInventory}
          />

          <Button type="submit" data-testid="submit-button">
            Sign Up
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUp;
