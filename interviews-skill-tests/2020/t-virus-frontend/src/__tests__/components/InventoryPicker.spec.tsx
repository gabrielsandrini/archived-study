import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import InventoryPicker from '../../components/InventoryPicker';

describe('InventoryPicker', () => {
  it('should render the inventory picker', () => {
    const mockedCallback = jest.fn();

    const { getByDisplayValue } = render(
      <InventoryPicker
        setInventoryCallback={mockedCallback}
        inventory={{
          'Fiji Water': 10,
          'Campbell Soup': 0,
          'First Aid Pouch': 0,
          AK47: 0,
        }}
      />,
    );

    const fijiWaterQty = getByDisplayValue('10');

    expect(fijiWaterQty).toBeTruthy();
  });

  it('should be able to change the amount of items', () => {
    const mockedCallback = jest.fn();

    const { getByDisplayValue } = render(
      <InventoryPicker
        setInventoryCallback={mockedCallback}
        inventory={{
          'Fiji Water': 1,
          'Campbell Soup': 0,
          'First Aid Pouch': 0,
          AK47: 0,
        }}
      />,
    );

    const fijiWaterInput = getByDisplayValue('1');
    expect(fijiWaterInput).toBeTruthy();

    fireEvent.change(fijiWaterInput, {
      target: { name: 'Fiji Water', value: 10 },
    });

    expect(mockedCallback).toHaveBeenCalledWith({
      'Fiji Water': 10,
      'Campbell Soup': 0,
      'First Aid Pouch': 0,
      AK47: 0,
    });
  });

  it('should not be able to set an negative amount of items', () => {
    const mockedCallback = jest.fn();

    const { getByDisplayValue } = render(
      <InventoryPicker
        setInventoryCallback={mockedCallback}
        inventory={{
          'Fiji Water': 1,
          'Campbell Soup': 0,
          'First Aid Pouch': 0,
          AK47: 0,
        }}
      />,
    );

    const fijiWaterInput = getByDisplayValue('1');
    expect(fijiWaterInput).toBeTruthy();

    fireEvent.change(fijiWaterInput, {
      target: { name: 'Fiji Water', value: -10 },
    });

    expect(mockedCallback).not.toHaveBeenCalled();
  });
});
