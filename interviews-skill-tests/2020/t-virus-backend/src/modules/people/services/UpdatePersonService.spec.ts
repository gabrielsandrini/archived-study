import AppError from '@shared/errors/AppError';
import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';
import UpdatePersonService from './UpdatePersonService';

let fakePeopleRepository: FakePeopleRepository;
let updatePersonService: UpdatePersonService;

describe('UpdateUserPerson', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();

    updatePersonService = new UpdatePersonService(fakePeopleRepository);
  });

  it('Should be able to update an user profile', async () => {
    const user = await fakePeopleRepository.create({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',

      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    const updatedUser = await updatePersonService.execute({
      id: user.id,
      name: 'John Doe',
      age: 30,
      gender: 'M',
      lonlat: 'Point(0 0)',
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.age).toBe(30);
    expect(updatedUser.gender).toBe('M');
    expect(updatedUser.lonlat).toBe('Point(0 0)');
  });

  it('Should be able to update an user name', async () => {
    const user = await fakePeopleRepository.create({
      name: 'John Tree',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',

      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    const updatedUser = await updatePersonService.execute({
      id: user.id,
      name: 'John Doe',
      age: 30,
      gender: 'M',
      lonlat: 'Point(0 0)',
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.age).toBe(30);
    expect(updatedUser.gender).toBe('M');
    expect(updatedUser.lonlat).toBe('Point(0 0)');
  });

  it('Should not be able to change to an existing user name', async () => {
    await fakePeopleRepository.create({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',

      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    const user = await fakePeopleRepository.create({
      name: 'John Tree',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',

      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    await expect(
      updatePersonService.execute({
        id: user.id,
        name: 'John Doe',
        age: 65,
        gender: 'M',
        lonlat: 'Point(-0000.111 1111.000)',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update a non existing user', async () => {
    await expect(
      updatePersonService.execute({
        id: 'id_not_existent',
        name: 'John Doe',
        age: 65,
        gender: 'M',
        lonlat: 'Point(-0000.111 1111.000)',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
