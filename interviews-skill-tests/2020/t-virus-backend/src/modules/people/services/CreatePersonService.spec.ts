import AppError from '@shared/errors/AppError';
import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';
import CreatePersonService from './CreatePersonService';

let fakePeopleRepository: FakePeopleRepository;
let createUser: CreatePersonService;

describe('CreatePerson', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();

    createUser = new CreatePersonService(fakePeopleRepository);
  });
  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',

      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not allow create two users with the same name', async () => {
    await createUser.execute({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',

      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        age: 20,
        gender: 'M',

        fiji_water: 1,
        campbell_soup: 2,
        first_aid_pouch: 3,
        AK47: 4,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
