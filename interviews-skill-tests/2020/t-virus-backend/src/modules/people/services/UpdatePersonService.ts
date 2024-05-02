import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPeopleRepository from '../repositories/IPeopleRepository';
import User from '../infra/typeorm/entities/People';

interface IRequest {
  id: string;
  name: string;
  age: number;
  gender: string;
  lonlat: string;
}
@injectable()
class UpdatePersonService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute({
    id,
    name,
    age,
    gender,
    lonlat,
  }: IRequest): Promise<User> {
    const user = await this.peopleRepository.findById(id);

    if (!user) {
      throw new AppError('Survivor not found');
    }

    if (user.name !== name) {
      // Check if there is an user already using the name
      const userWithUpdatedName = await this.peopleRepository.findByName(name);

      if (userWithUpdatedName) {
        throw new AppError('Name already in use');
      }

      user.name = name;
    }

    Object.assign(user, { age, gender, lonlat });

    return this.peopleRepository.update(user);
  }
}
export default UpdatePersonService;
