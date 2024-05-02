type phoneAreas = '011' | '016' | '017' | '018';

interface ICalculateCallPriceServiceDTO {
  from: phoneAreas;
  to: phoneAreas;
  minutes: number;
}

interface IPricePerPlan {
  name: string;
  value: number;
}

interface IGetPricePerMinute {
  from: phoneAreas;
  to: phoneAreas;
}

interface IPricesPerMinute {
  [from: string]: {
    [to: string]: number;
  };
}

interface IPlan {
  name: string;
  minutes: number;
}

class CalculateCallPriceService {
  private readonly prices = {
    '011': {
      '016': 1.9,
      '017': 1.7,
      '018': 0.9,
    },
    '016': {
      '011': 2.9,
    },
    '017': {
      '011': 2.7,
    },
    '018': {
      '011': 1.9,
    },
  } as IPricesPerMinute;

  private readonly plans = [
    { name: 'FaleMais30', minutes: 30 },
    { name: 'FaleMais60', minutes: 60 },
    { name: 'FaleMais120', minutes: 120 },
  ] as IPlan[];

  private getPricePerMinute({ from, to }: IGetPricePerMinute): number {
    return this.prices[from][to];
  }

  public execute({
    from,
    to,
    minutes,
  }: ICalculateCallPriceServiceDTO): IPricePerPlan[] {
    const calculatedPrice = [] as IPricePerPlan[];

    const pricePerMinute = this.getPricePerMinute({ from, to });
    const pricePerMinuteWithPlans = pricePerMinute * 1.1;

    const priceWithoutPlans = pricePerMinute * minutes;
    calculatedPrice.push({ name: 'Sem Plano', value: priceWithoutPlans });

    this.plans.forEach(plan => {
      const minutesExceeded = minutes - plan.minutes;

      if (minutesExceeded <= 0) {
        calculatedPrice.push({ name: plan.name, value: 0.0 });
        return;
      }

      calculatedPrice.push({
        name: plan.name,
        value: minutesExceeded * pricePerMinuteWithPlans,
      });
    });

    return calculatedPrice;
  }
}

export default CalculateCallPriceService;
