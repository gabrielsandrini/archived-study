import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPeopleRepository from '../repositories/IPeopleRepository';

interface IItems {
  fiji_water: number;
  campbell_soup: number;
  first_aid_pouch: number;
  AK47: number;
}

interface IRequest {
  person_id: string;
  recipient_full_name: string;
  pick: IItems;
  payment: IItems;
}

type InventoryItemId =
  | 'fiji_water'
  | 'campbell_soup'
  | 'first_aid_pouch'
  | 'AK47';

@injectable()
export default class TradeItemsService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  private calculatePoints(items: IItems): number {
    const points = {
      fiji_water: 14,
      campbell_soup: 12,
      first_aid_pouch: 10,
      AK47: 8,
    } as IItems;

    const calculatedPoints = Object.keys(items).reduce((acc, key) => {
      let accumulator = acc;
      const parsedKey = key as InventoryItemId;

      accumulator += points[parsedKey] * items[parsedKey];
      return accumulator;
    }, 0);

    return calculatedPoints;
  }

  public async execute({
    person_id,
    recipient_full_name,
    payment,
    pick,
  }: IRequest): Promise<void> {
    const survivor = await this.peopleRepository.findById(person_id);

    if (!survivor) {
      throw new AppError('Wrong survivor id', 406);
    }

    if (survivor.infected) {
      throw new AppError('You can not trade items', 406);
    }

    const recipient_survivor = await this.peopleRepository.findByName(
      recipient_full_name,
    );

    if (!recipient_survivor) {
      throw new AppError('Wrong recipient name', 406);
    }

    if (recipient_survivor.infected) {
      throw new AppError('You can not trade with an infected', 406);
    }

    const pickPoints = this.calculatePoints(pick);

    const paymentPoints = this.calculatePoints(payment);

    if (pickPoints !== paymentPoints) {
      throw new AppError('The pick and the payment points do not match', 406);
    }

    const {
      fiji_water: fiji_water_payment,
      campbell_soup: campbell_soup_payment,
      first_aid_pouch: first_aid_pouch_payment,
      AK47: AK47_payment,
    } = payment;

    const {
      fiji_water: fiji_water_pick,
      campbell_soup: campbell_soup_pick,
      first_aid_pouch: first_aid_pouch_pick,
      AK47: AK47_pick,
    } = pick;

    // change survivor items
    survivor.fiji_water =
      survivor.fiji_water - fiji_water_payment + fiji_water_pick;

    survivor.campbell_soup =
      survivor.campbell_soup - campbell_soup_payment + campbell_soup_pick;

    survivor.first_aid_pouch =
      survivor.first_aid_pouch - first_aid_pouch_payment + first_aid_pouch_pick;

    survivor.AK47 = survivor.AK47 - AK47_payment + AK47_pick;

    // change the recipient items
    recipient_survivor.fiji_water =
      recipient_survivor.fiji_water + fiji_water_payment - fiji_water_pick;

    recipient_survivor.campbell_soup =
      recipient_survivor.campbell_soup +
      campbell_soup_payment -
      campbell_soup_pick;

    recipient_survivor.first_aid_pouch =
      recipient_survivor.first_aid_pouch +
      first_aid_pouch_payment -
      first_aid_pouch_pick;

    recipient_survivor.AK47 =
      recipient_survivor.AK47 + AK47_payment - AK47_pick;

    // Save both of them

    this.peopleRepository.update(survivor);
    this.peopleRepository.update(recipient_survivor);
  }
}
