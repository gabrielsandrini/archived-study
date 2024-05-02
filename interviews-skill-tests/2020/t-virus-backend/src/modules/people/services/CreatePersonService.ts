import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import People from '../infra/typeorm/entities/People';
import IPeopleRepository from '../repositories/IPeopleRepository';
import ICreatePersonDTO from '../dtos/ICreatePersonDTO';

@injectable()
class CreatePersonService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute({
    name,
    age,
    gender,
    lonlat,
    fiji_water,
    campbell_soup,
    first_aid_pouch,
    AK47,
  }: ICreatePersonDTO): Promise<People> {
    const emailAlreadyInUse = await this.peopleRepository.findByName(name);

    if (emailAlreadyInUse) {
      throw new AppError('This survivor name is already in use');
    }

    const customer = await this.peopleRepository.create({
      name,
      age,
      gender,
      lonlat,
      fiji_water,
      campbell_soup,
      first_aid_pouch,
      AK47,
    });

    return customer;
  }
}

export default CreatePersonService;
