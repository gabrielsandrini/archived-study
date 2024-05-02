import React from 'react';
import { render } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button', () => {
  it('should be able to render the button', () => {
    const { getByText } = render(<Button>children-test</Button>);

    const buttonElement = getByText('children-test');

    expect(buttonElement).toBeTruthy();
  });

  it('should be able to render the loading text', () => {
    const { getByText } = render(<Button loading>children-test</Button>);

    const buttonElement = getByText('Loading...');

    expect(buttonElement).toBeTruthy();
  });
});
