import React, { useState, useCallback, useRef } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { ButtonContainer, ModalContent, ModalButtons } from './styles';
import Button from '../Button';
import Modal from '../Modal';
import Input from '../Input';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface FlagInfectedFormData {
  name: string;
}
interface User {
  id: string;
  name: string;
}

const FlagIsInfected: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const toggleModal = useCallback(() => {
    setIsModalOpen(state => !state);
  }, [setIsModalOpen]);

  const handleSubmit = useCallback(
    async (data: FlagInfectedFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        const { name } = data;

        setIsLoading(true);

        // get user Id
        const response = await api.get<User[]>('/people.json');

        const users = response.data;

        const userInfected = users.find(usr => usr.name === name);

        if (!userInfected) {
          throw new Error('User not found');
        }

        const { id: infectedId } = userInfected;

        await api.post(`/people/${user.id}/report_infection.json`, {
          infected: infectedId,
        });

        setIsLoading(false);

        addToast({
          type: 'success',
          title: 'Success',
        });

        toggleModal();
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
            'An error has occurred. No survivor was found with this name',
        });
      }
    },
    [addToast, toggleModal],
  );

  const handleCancel = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  return (
    <>
      <ButtonContainer>
        <Button
          color="#b52121"
          textColor="#fff"
          onClick={toggleModal}
          data-testid="open-flag-modal"
        >
          Flag Infected
        </Button>
      </ButtonContainer>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} toggleIsOpen={toggleModal}>
          <ModalContent>
            <h1>Flag Infected</h1>
            <Form
              onSubmit={handleSubmit}
              ref={formRef}
              data-testid="flag-infected-form"
            >
              <Input
                id="name-input"
                name="name"
                placeholder="Name of the infected"
              />

              <ModalButtons>
                <Button
                  color="#1e751a"
                  textColor="#fff"
                  type="submit"
                  data-testid="submit-button"
                  loading={isLoading}
                >
                  Flag
                </Button>

                <Button
                  type="reset"
                  color="#b52121"
                  textColor="#fff"
                  data-testid="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </ModalButtons>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default FlagIsInfected;
