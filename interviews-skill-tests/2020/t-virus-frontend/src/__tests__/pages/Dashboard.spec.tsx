import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';

const mockedSignOut = jest.fn();
const mockedHistoryReplace = jest.fn();

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
      signOut: mockedSignOut,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      replace: mockedHistoryReplace,
    }),
  };
});

describe('Dashboard page', () => {
  it('should render the page', () => {
    const { getByText } = render(<Dashboard />);

    const lastLocationComponent = getByText('Last Location:');

    expect(lastLocationComponent).toBeTruthy();
  });

  it('should log out when log out button pressed', () => {
    const { getByTitle } = render(<Dashboard />);

    const logoutButton = getByTitle('Sign Out');

    act(() => {
      fireEvent.click(logoutButton);
    });

    expect(mockedSignOut).toHaveBeenCalledTimes(1);
    expect(mockedHistoryReplace).toHaveBeenCalledWith('/', []);
  });
});
