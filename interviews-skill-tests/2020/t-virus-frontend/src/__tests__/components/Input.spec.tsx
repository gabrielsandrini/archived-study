import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Input from '../../components/Input';

const mockedUseField = jest.fn().mockImplementation(() => ({
  fieldName: 'email',
  defaultValue: '',
  error: '',
  registerField: jest.fn(),
}));

jest.mock('@unform/core', () => ({
  useField: () => mockedUseField(),
}));

describe('InputComponent', () => {
  it('Should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    act(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000');
      expect(containerElement).toHaveStyle('color: #ff9000');
    });

    fireEvent.blur(inputElement);

    act(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000');
      expect(containerElement).not.toHaveStyle('color: #ff9000');
    });
  });

  it('should keep input text highlight when filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'jonhDoe@example.com' },
    });

    fireEvent.blur(inputElement);

    act(() => {
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });

  it('should highlight input on error', () => {
    mockedUseField.mockImplementationOnce(() => ({
      fieldName: 'email',
      defaultValue: '',
      error: 'invalid e-mail',
      registerField: jest.fn(),
    }));

    const { getByTestId } = render(<Input name="email" placeholder="E-mail" />);

    const containerElement = getByTestId('input-container');

    act(() => {
      expect(containerElement).toHaveStyle('border-color: #c53030');
    });
  });

  it('should render the icon when passed by props', () => {
    const mockedIcon = jest.fn().mockImplementation(() => {
      return <span>test-icon</span>;
    });

    const { getByText } = render(
      <Input name="email" placeholder="E-mail" icon={mockedIcon} />,
    );

    const iconElement = getByText('test-icon');

    expect(iconElement).toBeTruthy();
  });
});
