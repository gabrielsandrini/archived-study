import IInfectedRegisterRepository from '@modules/people/repositories/IInfectedRegisterRepository';
import InfectedRegister from '@modules/people/infra/typeorm/entities/InfectedRegister';
import { getRepository, Repository } from 'typeorm';
import ICreateInfectedRegisterDTO from '@modules/people/dtos/ICreateInfectedRegisterDTO';
import IFindInfectedRegister from '@modules/people/dtos/IFindInfectedRegister';

export default class InfectedRegisterRepository
  implements IInfectedRegisterRepository {
  private ormRepository: Repository<InfectedRegister>;

  constructor() {
    this.ormRepository = getRepository(InfectedRegister);
  }

  async create(data: ICreateInfectedRegisterDTO): Promise<InfectedRegister> {
    const register = this.ormRepository.create(data);

    await this.ormRepository.save(register);

    return register;
  }

  async count(infected_id: string): Promise<number> {
    const result = await this.ormRepository.find({ where: { infected_id } });

    return result.length;
  }

  async find(
    data: IFindInfectedRegister,
  ): Promise<InfectedRegister | undefined> {
    const { people_id, infected_id } = data;

    const result = await this.ormRepository.findOne({
      where: { people_id, infected_id },
    });

    return result;
  }
}
