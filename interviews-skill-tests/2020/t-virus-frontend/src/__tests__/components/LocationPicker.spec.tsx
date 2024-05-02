import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import LocationPicker from '../../components/LocationPicker';

describe('LocationPicker', () => {
  it('should render the modal', () => {
    const mockedSetLocationCallback = jest.fn();

    const { getByText } = render(
      <LocationPicker
        setLocationCallback={mockedSetLocationCallback}
        lastLocation="test-coordinate"
      />,
    );

    const locationText = getByText('test-coordinate');
    const buttonElement = getByText('Change last location');

    act(() => {
      fireEvent.click(buttonElement);
    });

    const modalElement = getByText('No implemented yet');

    expect(locationText).toBeTruthy();
    expect(modalElement).toBeTruthy();
  });

  it('it should render "No locations registered"', () => {
    const mockedSetLocationCallback = jest.fn();

    const { getByText } = render(
      <LocationPicker
        setLocationCallback={mockedSetLocationCallback}
        lastLocation=""
      />,
    );

    const locationText = getByText('No locations registered');

    expect(locationText).toBeTruthy();
  });
});
