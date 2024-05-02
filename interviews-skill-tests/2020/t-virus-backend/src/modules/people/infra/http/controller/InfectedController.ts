import { Request, Response } from 'express';

import { container } from 'tsyringe';

import FlagInfectedService from '@modules/people/services/FlagInfectedService';

export default class PeopleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: people_id } = request.params;
    const { infected: infected_id } = request.body;

    const flagInfectedService = container.resolve(FlagInfectedService);

    const person = await flagInfectedService.execute({
      people_id,
      infected_id,
    });

    return response.json(person);
  }
}
