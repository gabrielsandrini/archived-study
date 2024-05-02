import React from 'react';
import { render } from '@testing-library/react';

import Modal from '../../components/Modal';

describe('Modal', () => {
  it('should render the modal', () => {
    const mockedToggleOpen = jest.fn();

    const { getByText } = render(
      <Modal isOpen toggleIsOpen={mockedToggleOpen}>
        children-test
      </Modal>,
    );

    const modalElement = getByText('children-test');

    expect(modalElement).toBeTruthy();
  });
});
