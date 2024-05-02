import React, { useCallback, useMemo, useState } from 'react';
import CalculateCallPriceService from '../../services/CalculateCallPriceService';
import { Button, Container, MinutesInput, Selector, Prices } from './styles';
import formatValue from '../../utils/formatValue';

type phoneAreas = '011' | '016' | '017' | '018';

interface IParsedPrice {
  name: string;
  value: string;
}

const Home: React.FC = () => {
  const [from, setFrom] = useState<phoneAreas>('011');
  const [to, setTo] = useState<phoneAreas>('016');
  const [minutes, setMinutes] = useState(0);

  const parsedPrices = useMemo<IParsedPrice[]>(() => {
    if (!from || !to) {
      return [] as IParsedPrice[];
    }

    const checkedMinutes = minutes || 0;

    const calculatePriceService = new CalculateCallPriceService();

    const calculatedPrices = calculatePriceService.execute({
      to,
      from,
      minutes: checkedMinutes,
    });

    const parsedData = calculatedPrices.map(plan => ({
      name: plan.name,
      value: isNaN(plan.value)
        ? 'Preço do minuto não informado'
        : formatValue(plan.value),
    }));

    return parsedData;
  }, [to, from, minutes]);

  const handleMinutesInputChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setMinutes(Number(event.currentTarget.value));
    },
    [],
  );

  return (
    <Container>
      <Selector>
        <h2>Origem:</h2>
        <div className="buttons">
          <Button
            onClick={() => setFrom('011')}
            selected={from === '011'}
            data-testid="button01"
          >
            011
          </Button>
          <Button onClick={() => setFrom('016')} selected={from === '016'}>
            016
          </Button>
          <Button onClick={() => setFrom('017')} selected={from === '017'}>
            017
          </Button>
          <Button onClick={() => setFrom('018')} selected={from === '018'}>
            018
          </Button>
        </div>
      </Selector>

      <Selector>
        <h2>Destino:</h2>
        <div className="buttons">
          <Button onClick={() => setTo('011')} selected={to === '011'}>
            011
          </Button>
          <Button
            onClick={() => setTo('016')}
            selected={to === '016'}
            data-testid="button02"
          >
            016
          </Button>
          <Button onClick={() => setTo('017')} selected={to === '017'}>
            017
          </Button>
          <Button onClick={() => setTo('018')} selected={to === '018'}>
            018
          </Button>
        </div>
      </Selector>

      <MinutesInput>
        <h2>Minutos:</h2>
        <input
          type="number"
          min={0}
          value={minutes}
          onChange={handleMinutesInputChange}
          data-testid="minute-input"
        />
      </MinutesInput>

      <Prices>
        <h2>Preços:</h2>
        <div className="cards">
          {parsedPrices.length > 0 &&
            parsedPrices.map(plan => (
              <div key={plan.name}>
                <h2>{plan.name}</h2>
                <span>{plan.value}</span>
              </div>
            ))}
        </div>
      </Prices>
    </Container>
  );
};

export default Home;
