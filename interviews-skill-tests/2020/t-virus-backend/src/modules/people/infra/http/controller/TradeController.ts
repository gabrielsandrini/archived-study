import { Request, Response } from 'express';

import { container } from 'tsyringe';

import TradeItemsService from '@modules/people/services/TradeItemsService';

export default class TradeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { person_id } = request.body;
    const { name, pick, payment } = request.body;

    const {
      'Fiji Water': fiji_water_pick,
      'Campbell Soup': campbell_soup_pick,
      'First Aid Pouch': first_aid_pouch_pick,
      AK47: AK47_pick,
    } = pick;

    const parsedPick = {
      fiji_water: fiji_water_pick,
      campbell_soup: campbell_soup_pick,
      first_aid_pouch: first_aid_pouch_pick,
      AK47: AK47_pick,
    };

    const {
      'Fiji Water': fiji_water_payment,
      'Campbell Soup': campbell_soup_payment,
      'First Aid Pouch': first_aid_pouch_payment,
      AK47: AK47_payment,
    } = payment;

    const parsedPayment = {
      fiji_water: fiji_water_payment,
      campbell_soup: campbell_soup_payment,
      first_aid_pouch: first_aid_pouch_payment,
      AK47: AK47_payment,
    };

    const tradeItemsService = container.resolve(TradeItemsService);

    await tradeItemsService.execute({
      person_id,
      recipient_full_name: name,
      pick: parsedPick,
      payment: parsedPayment,
    });

    return response.json({}).status(200);
  }
}
