import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePersonService from '@modules/people/services/CreatePersonService';
import UpdatePersonService from '@modules/people/services/UpdatePersonService';

export default class PeopleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, age, gender, lonlat, ...rest } = request.body;

    const {
      'Fiji Water': fiji_water,
      'Campbell Soup': campbell_soup,
      'First Aid Pouch': first_aid_pouch,
      AK47,
    } = rest;

    const createPersonService = container.resolve(CreatePersonService);

    const person = await createPersonService.execute({
      name,
      age,
      gender,
      lonlat,
      fiji_water,
      campbell_soup,
      first_aid_pouch,
      AK47,
    });

    return response.json(person);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, age, gender, lonlat } = request.body;

    const updatePersonService = container.resolve(UpdatePersonService);

    const person = await updatePersonService.execute({
      id,
      name,
      age,
      gender,
      lonlat,
    });

    return response.json(person);
  }
}
