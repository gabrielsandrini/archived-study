import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import ToastContainer from '../../components/ToastContainer';

const mockedRemoveToast = jest.fn();
jest.mock('../../hooks/toast', () => ({
  useToast() {
    return {
      removeToast: mockedRemoveToast,
    };
  },
}));

describe('Toast container', () => {
  it('Should be able to render a toast', async () => {
    jest.useFakeTimers();

    const { getByText } = render(
      <ToastContainer
        messages={[
          {
            id: 'toast-id',
            type: 'success',
            title: 'toast-title',
            description: 'toast-description',
          },
        ]}
      />,
    );

    const toastTitleElement = getByText('toast-title');
    expect(toastTitleElement).toBeTruthy();

    jest.runAllTimers();
    expect(mockedRemoveToast).toHaveBeenCalledWith('toast-id');
  });

  it('Should be able to remove a toast', async () => {
    jest.useFakeTimers();

    const { getByText, getByTestId } = render(
      <ToastContainer
        messages={[
          {
            id: 'toast-id',
            type: 'success',
            title: 'toast-title',
            description: 'toast-description',
          },
        ]}
      />,
    );

    const toastTitleElement = getByText('toast-title');
    expect(toastTitleElement).toBeTruthy();

    const removeToastButtonElement = getByTestId('remove-toast-button');

    act(() => {
      fireEvent.click(removeToastButtonElement);
    });

    expect(mockedRemoveToast).toHaveBeenCalledWith('toast-id');
  });
});
