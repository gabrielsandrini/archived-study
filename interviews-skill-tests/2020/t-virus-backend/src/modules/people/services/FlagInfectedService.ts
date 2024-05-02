import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import InfectedRegister from '../infra/typeorm/entities/InfectedRegister';
import IInfectedRegisterRepository from '../repositories/IInfectedRegisterRepository';
import ICreateInfectedRegisterDTO from '../dtos/ICreateInfectedRegisterDTO';
import IPeopleRepository from '../repositories/IPeopleRepository';

@injectable()
export default class FlagInfectedService {
  constructor(
    @inject('InfectedRegisterRepository')
    private infectedRepository: IInfectedRegisterRepository,

    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute({
    infected_id,
    people_id,
  }: ICreateInfectedRegisterDTO): Promise<InfectedRegister> {
    const infected = await this.peopleRepository.findById(infected_id);

    if (!infected) {
      throw new AppError('Wrong infected id', 406);
    }

    const person = await this.peopleRepository.findById(people_id);

    if (!person) {
      throw new AppError('Wrong survivor id', 406);
    }

    const flagAlreadyExists = await this.infectedRepository.find({
      infected_id,
      people_id,
    });

    if (flagAlreadyExists) {
      throw new AppError('You have already reported this user', 406);
    }

    const flag = await this.infectedRepository.create({
      infected_id,
      people_id,
    });

    const count = await this.infectedRepository.count(infected_id);

    if (count === 5) {
      this.peopleRepository.update(Object.assign(infected, { infected: true }));

      person.fiji_water += infected.fiji_water;
      person.campbell_soup += infected.campbell_soup;
      person.first_aid_pouch += infected.first_aid_pouch;
      person.AK47 += infected.AK47;

      await this.peopleRepository.update(person);
    }

    return flag;
  }
}
