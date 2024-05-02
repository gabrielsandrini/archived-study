import React, { useState, useCallback } from 'react';

import { ButtonContainer } from './styles';
import Button from '../Button';
import Modal from '../Modal';

interface LocationPickerProps {
  setLocationCallback(location: string): void;
  lastLocation: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  setLocationCallback,
  lastLocation,
}: LocationPickerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen(state => !state);
  }, [setIsModalOpen]);

  return (
    <>
      <ButtonContainer>
        <Button color="#fff" onClick={toggleModal}>
          Change last location
        </Button>
        <span>{lastLocation || 'No locations registered'}</span>
      </ButtonContainer>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} toggleIsOpen={toggleModal}>
          No implemented yet
        </Modal>
      )}
    </>
  );
};

export default LocationPicker;
