import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to Sign In', async () => {
    const user = {
      id: 'user-id',
      name: 'John Doe',
      age: 19,
      gender: 'M',
      lonlat: undefined,
      infected: false,
    };

    const apiResponse = [user];

    apiMock.onGet('/people.json').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      name: 'John Doe',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@TVirusResistance:user',
      JSON.stringify(user),
    );

    expect(result.current.user.name).toBe('John Doe');
    expect(result.current.user.id).toBe('user-id');
  });
  it('Should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@TVirusResistance:user':
          return JSON.stringify({
            id: 'user-id',
            name: 'John Doe',
            age: 19,
            gender: 'M',
            lonlat: undefined,
            infected: false,
          });

        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.id).toEqual('user-id');
  });

  it('Should be able to signOut', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@TVirusResistance:user':
          return JSON.stringify({
            id: 'user-id',
            name: 'John Doe',
            age: 19,
            gender: 'M',
            lonlat: undefined,
            infected: false,
          });

        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(1);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user-id',
      name: 'John Doe',
      age: 19,
      gender: 'M',
      lonlat: undefined,
      infected: false,
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@TVirusResistance:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });

  it('should not be able to login with invalid credentials', async () => {
    const user = {
      id: 'user-id',
      name: 'John Doe',
      age: 19,
      gender: 'M',
      lonlat: undefined,
      infected: false,
    };

    const apiResponse = [user];

    apiMock.onGet('/people.json').reply(200, apiResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await expect(
      result.current.signIn({
        name: 'invalid-user',
      }),
    ).rejects.toThrowError('Invalid credentials');
  });
});
