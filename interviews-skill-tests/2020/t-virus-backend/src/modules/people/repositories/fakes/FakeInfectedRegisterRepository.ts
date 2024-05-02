import IInfectedRegisterRepository from '@modules/people/repositories/IInfectedRegisterRepository';
import InfectedRegister from '@modules/people/infra/typeorm/entities/InfectedRegister';
import ICreateInfectedRegisterDTO from '@modules/people/dtos/ICreateInfectedRegisterDTO';
import IFindInfectedRegister from '@modules/people/dtos/IFindInfectedRegister';

export default class InfectedRegisterRepository
  implements IInfectedRegisterRepository {
  private infectedRegisters: InfectedRegister[] = [];

  async create(data: ICreateInfectedRegisterDTO): Promise<InfectedRegister> {
    const register = new InfectedRegister();
    Object.assign(register, data);

    this.infectedRegisters.push(register);

    return register;
  }

  async count(infected_id: string): Promise<number> {
    const result = this.infectedRegisters.filter(
      i => i.infected_id === infected_id,
    );

    return result.length;
  }

  async find(
    data: IFindInfectedRegister,
  ): Promise<InfectedRegister | undefined> {
    const { people_id, infected_id } = data;

    const result = this.infectedRegisters.find(
      i => i.infected_id === infected_id && i.people_id === people_id,
    );

    return result;
  }
}
