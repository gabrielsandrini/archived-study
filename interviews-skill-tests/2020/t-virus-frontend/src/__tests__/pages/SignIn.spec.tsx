import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignIn />);

    const nameField = getByPlaceholderText('Name');
    const buttonElement = getByTestId('submit-button');

    act(() => {
      fireEvent.change(nameField, { target: { value: 'John Doe' } });

      fireEvent.click(buttonElement);
    });

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });
  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignIn />);

    const nameField = getByPlaceholderText('Name');
    const buttonElement = getByTestId('submit-button');

    act(() => {
      fireEvent.change(nameField, { target: { value: '' } });

      fireEvent.click(buttonElement);
    });

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error when login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByTestId } = render(<SignIn />);

    const nameField = getByPlaceholderText('Name');
    const buttonElement = getByTestId('submit-button');

    act(() => {
      fireEvent.change(nameField, { target: { value: 'John Doe' } });

      fireEvent.click(buttonElement);
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
