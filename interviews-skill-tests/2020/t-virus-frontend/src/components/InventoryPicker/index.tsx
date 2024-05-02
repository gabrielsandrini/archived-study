import React, { useCallback, ChangeEvent } from 'react';

import { Container, ItemContainer, ItemContent } from './styles';

interface Inventory {
  'Fiji Water': number;
  'Campbell Soup': number;
  'First Aid Pouch': number;
  AK47: number;
}

type InventoryItemId =
  | 'Fiji Water'
  | 'Campbell Soup'
  | 'First Aid Pouch'
  | 'AK47';

interface InventoryPickerProps {
  setInventoryCallback(inventory: Inventory): void;
  inventory: Inventory;
}

const InventoryPicker: React.FC<InventoryPickerProps> = ({
  setInventoryCallback,
  inventory,
}: InventoryPickerProps) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (value >= 0) {
        const key = event.target.name as InventoryItemId;

        setInventoryCallback({ ...inventory, [key]: value });
      }
    },
    [setInventoryCallback, inventory],
  );

  return (
    <Container>
      <h2>Inventory</h2>
      {Object.keys(inventory).map(key => {
        const parsedKey = key as InventoryItemId;
        return (
          <ItemContainer key={key}>
            <ItemContent>
              <span>{parsedKey}: </span>
              <input
                name={parsedKey}
                type="number"
                onChange={handleChange}
                value={inventory[parsedKey]}
              />
            </ItemContent>
          </ItemContainer>
        );
      })}
    </Container>
  );
};

export default InventoryPicker;
