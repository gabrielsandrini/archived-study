import { container } from 'tsyringe';

import IPeopleRepository from '@modules/people/repositories/IPeopleRepository';
import PeopleRepository from '@modules/people/infra/typeorm/repositories/PeopleRepository';

import IInfectedRegisterRepository from '@modules/people/repositories/IInfectedRegisterRepository';
import InfectedRegisterRepository from '@modules/people/infra/typeorm/repositories/InfectedRegisterRepository';

container.registerSingleton<IPeopleRepository>(
  'PeopleRepository',
  PeopleRepository,
);

container.registerSingleton<IInfectedRegisterRepository>(
  'InfectedRegisterRepository',
  InfectedRegisterRepository,
);
