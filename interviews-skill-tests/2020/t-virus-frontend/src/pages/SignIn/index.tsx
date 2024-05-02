import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, FormContainer, Footer } from './styles';

interface SignInFormData {
  name: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        const { name } = data;

        setIsLoading(true);

        await signIn({ name });

        setIsLoading(false);

        addToast({
          type: 'success',
          title: 'Success',
        });

        history.push('/dashboard');
      } catch (err) {
        setIsLoading(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'An error has occurred',
          description:
            'An error has occurred. Please, check your credentials and try again',
        });
      }
    },
    [addToast, history, signIn],
  );

  return (
    <Container>
      <FormContainer>
        <h1>Who are you ?</h1>
        <Form onSubmit={handleSubmit} ref={formRef} data-testid="form-element">
          <Input name="name" placeholder="Name" />

          <Button type="submit" data-testid="submit-button" loading={isLoading}>
            Sign In
          </Button>
        </Form>
      </FormContainer>
      <Footer>
        <div>
          <span>Do not registered ?</span>
          <Link to="/signUp">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </Footer>
    </Container>
  );
};

export default SignIn;
