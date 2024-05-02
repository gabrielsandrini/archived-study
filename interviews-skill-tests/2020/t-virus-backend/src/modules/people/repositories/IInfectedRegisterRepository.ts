import ICreateInfectedRegisterDTO from '../dtos/ICreateInfectedRegisterDTO';
import IFindInfectedRegister from '../dtos/IFindInfectedRegister';
import InfectedRegister from '../infra/typeorm/entities/InfectedRegister';

export default interface IInfectedRegisterRepository {
  create(data: ICreateInfectedRegisterDTO): Promise<InfectedRegister>;
  count(infected_id: string): Promise<number>;
  find(data: IFindInfectedRegister): Promise<InfectedRegister | undefined>;
}
