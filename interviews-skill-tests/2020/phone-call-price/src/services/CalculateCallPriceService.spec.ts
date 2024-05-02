import CalculateCallPriceService from './CalculateCallPriceService';

describe('CalculateCallPrice', () => {
  it('Should calculate the price of the call using different plans', () => {
    const calculatePriceService = new CalculateCallPriceService();

    const prices = calculatePriceService.execute({
      from: '011',
      to: '016',
      minutes: 62,
    });

    expect(prices).toEqual([
      { name: 'Sem Plano', value: 117.8 },
      { name: 'FaleMais30', value: 66.88 },
      { name: 'FaleMais60', value: 4.18 },
      { name: 'FaleMais120', value: 0.0 },
    ]);
  });
});

/*
  De 011 para 016
  62 minutos

  1.90 o minuto
  Acréscimo 10%: 2.09

  Sem plano: 117.80
  FaleMais30: 66.88,
  FaleMais60: 4.18,
  FaleMais120: 0.00,
*/
