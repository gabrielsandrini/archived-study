import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from './index';

describe('Home Page', () => {
  it('renders the price of the calls', () => {
    const { getByText, getByTestId } = render(<Home />);
    fireEvent.click(getByTestId('button01'));
    fireEvent.click(getByTestId('button02'));
    fireEvent.change(getByTestId('minute-input'), {
      target: { value: 62 },
    });

    const priceWithoutPlan = getByText('R$117.80');
    const priceFaleMais30 = getByText('R$66.88');
    const priceFaleMais60 = getByText('R$4.18');
    const priceFaleMais120 = getByText('R$0.00');

    expect(priceWithoutPlan).toBeInTheDocument();
    expect(priceFaleMais30).toBeInTheDocument();
    expect(priceFaleMais60).toBeInTheDocument();
    expect(priceFaleMais120).toBeInTheDocument();
  });
});
