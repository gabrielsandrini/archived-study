// POST /api/people/{id}/report_infection.json
import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import FlagInfected from '../../components/FlagInfected';
import api from '../../services/api';

const mockedAddToast = jest.fn();

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: {
        id: 'user-id',
        name: 'John Doe',
        age: 19,
        gender: 'M',
        lonlat: undefined,
        infected: false,
      },
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

const mockedApi = new MockAdapter(api);
mockedApi.onGet('/people.json').reply(200, [
  {
    id: 'infected-id',
    name: 'John Doe Infected',
    age: 19,
    gender: 'M',
    lonlat: undefined,
    infected: false,
  },
]);

describe('FlagInfected Component', () => {
  beforeEach(() => {
    mockedAddToast.mockClear();
  });

  it('should be able to flag a infected user', async () => {
    mockedApi
      .onPost('/people/user-id/report_infection.json', {
        infected: 'infected-id',
      })
      .reply(200);

    const { getByPlaceholderText, getByTestId } = render(<FlagInfected />);

    const openModalButton = getByTestId('open-flag-modal');

    act(() => {
      fireEvent.click(openModalButton);
    });

    const nameInput = getByPlaceholderText('Name of the infected');

    const submitButton = getByTestId('submit-button');
    const cancelButton = getByTestId('cancel-button');

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'John Doe Infected' } });

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' }),
      );
    });

    expect(cancelButton).toBeTruthy();
  });

  it('should not be able to flag someone with an empty input', async () => {
    const { getByPlaceholderText, getByTestId } = render(<FlagInfected />);

    const openModalButton = getByTestId('open-flag-modal');

    act(() => {
      fireEvent.click(openModalButton);
    });

    const nameInput = getByPlaceholderText('Name of the infected');

    const submitButton = getByTestId('submit-button');

    act(() => {
      fireEvent.change(nameInput, { target: { value: '' } });

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockedAddToast).not.toHaveBeenCalled();
    });
  });

  it('should not be able to flag a non-existing user', async () => {
    const { getByPlaceholderText, getByTestId } = render(<FlagInfected />);

    const openModalButton = getByTestId('open-flag-modal');

    act(() => {
      fireEvent.click(openModalButton);
    });

    const nameInput = getByPlaceholderText('Name of the infected');

    const submitButton = getByTestId('submit-button');

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Non Existing User' } });

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });

  it('should display an error when the flag fails', async () => {
    mockedApi
      .onPost('/people/user-id/report_infection.json', {
        infected: 'infected-id',
      })
      .reply(400);

    const { getByPlaceholderText, getByTestId } = render(<FlagInfected />);

    const openModalButton = getByTestId('open-flag-modal');

    act(() => {
      fireEvent.click(openModalButton);
    });

    const nameInput = getByPlaceholderText('Name of the infected');

    const submitButton = getByTestId('submit-button');

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'John Doe Infected' } });

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });

  it('should close the modal when cancel button is clicked', () => {
    const { getByTestId, queryByTestId } = render(<FlagInfected />);

    const openModalButton = getByTestId('open-flag-modal');

    act(() => {
      fireEvent.click(openModalButton);
    });

    const cancelButton = getByTestId('cancel-button');

    expect(queryByTestId('cancel-button')).not.toBeNull();

    fireEvent.click(cancelButton);

    expect(queryByTestId('cancel-button')).toBeNull();
  });
});
