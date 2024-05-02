import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import SignUp from '../../pages/SignUp';
import api from '../../services/api';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

const apiMock = new MockAdapter(api);

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign up', async () => {
    apiMock.onPost('/people.json').reply(201);

    const { getByPlaceholderText, getByTestId } = render(<SignUp />);

    const nameField = getByPlaceholderText('Name');
    const ageField = getByPlaceholderText('Age');
    const genderField = getByPlaceholderText('Gender: M or F');
    const formElement = getByTestId('form-element');
    const buttonElement = getByTestId('submit-button');

    expect(buttonElement).toHaveAttribute('type', 'submit');
    act(() => {
      fireEvent.change(nameField, { target: { value: 'John Doe' } });
      fireEvent.change(ageField, { target: { value: 20 } });
      fireEvent.change(genderField, { target: { value: 'M' } });

      fireEvent.submit(formElement);
    });

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to sign up with invalid data', async () => {
    apiMock.onPost('/people.json').reply(201);

    const { getByPlaceholderText, getByTestId } = render(<SignUp />);

    const nameField = getByPlaceholderText('Name');
    const ageField = getByPlaceholderText('Age');
    const genderField = getByPlaceholderText('Gender: M or F');
    const formElement = getByTestId('form-element');
    const buttonElement = getByTestId('submit-button');

    expect(buttonElement).toHaveAttribute('type', 'submit');
    act(() => {
      fireEvent.change(nameField, { target: { value: 'John Doe' } });
      fireEvent.change(ageField, { target: { value: '' } });
      fireEvent.change(genderField, { target: { value: 'W' } });

      fireEvent.submit(formElement);
    });

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error toast when sign up fails', async () => {
    apiMock.onPost('/people.json').reply(400);

    const { getByPlaceholderText, getByTestId } = render(<SignUp />);

    const nameField = getByPlaceholderText('Name');
    const ageField = getByPlaceholderText('Age');
    const genderField = getByPlaceholderText('Gender: M or F');
    const formElement = getByTestId('form-element');
    const buttonElement = getByTestId('submit-button');

    expect(buttonElement).toHaveAttribute('type', 'submit');
    act(() => {
      fireEvent.change(nameField, { target: { value: 'John Doe' } });
      fireEvent.change(ageField, { target: { value: 20 } });
      fireEvent.change(genderField, { target: { value: 'M' } });

      fireEvent.submit(formElement);
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
