import { renderHook, act } from '@testing-library/react-hooks';
import { ToastMessage, ToastProvider, useToast } from '../../hooks/toast';

jest.mock('uuidv4', () => {
  return {
    uuid: () => 'test-id',
  };
});

describe('Toast hooks', () => {
  it('Should be able to add and remove a toast', () => {
    const toastData = {
      title: 'toast-title',
      description: 'toast-description',
      type: 'success',
    } as ToastMessage;

    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.addToast(toastData);
    });

    expect(result.current.messages).toMatchObject([
      { ...toastData, id: 'test-id' },
    ]);

    act(() => {
      result.current.removeToast('test-id');
    });

    expect(result.current.messages).toMatchObject([]);
  });
});
