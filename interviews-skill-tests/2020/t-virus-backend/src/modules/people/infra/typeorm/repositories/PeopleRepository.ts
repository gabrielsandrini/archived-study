import { getRepository, Repository } from 'typeorm';

import IPeopleRepository from '@modules/people/repositories/IPeopleRepository';
import ICreatePersonDTO from '@modules/people/dtos/ICreatePersonDTO';
import People from '../entities/People';

class PeopleRepository implements IPeopleRepository {
  private ormRepository: Repository<People>;

  constructor() {
    this.ormRepository = getRepository(People);
  }

  public async create({
    name,
    age,
    gender,
    lonlat,
    fiji_water,
    campbell_soup,
    first_aid_pouch,
    AK47,
  }: ICreatePersonDTO): Promise<People> {
    const customer = this.ormRepository.create({
      name,
      age,
      gender,
      lonlat,
      fiji_water,
      campbell_soup,
      first_aid_pouch,
      AK47,
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async findById(id: string): Promise<People | undefined> {
    const findPeople = await this.ormRepository.findOne(id);

    return findPeople;
  }

  public async findByName(name: string): Promise<People | undefined> {
    const findPeople = await this.ormRepository.findOne({ where: { name } });

    return findPeople;
  }

  public async update(user: People): Promise<People> {
    return this.ormRepository.save(user);
  }
}

export default PeopleRepository;
