import People from '../infra/typeorm/entities/People';

import ICreatePersonDTO from '../dtos/ICreatePersonDTO';

export default interface IPeopleRepository {
  create(data: ICreatePersonDTO): Promise<People>;
  findById(id: string): Promise<People | undefined>;
  findByName(name: string): Promise<People | undefined>;
  update(user: People): Promise<People>;
}
